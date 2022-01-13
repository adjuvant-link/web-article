'use strict';

// api information for the bitcoin node provider
// https://www.blockcypher.com/dev/bitcoin/#address-api
const btc_addr_balance_endpoint = (addr) => `https://api.blockcypher.com/v1/btc/main/addrs/${addr}/balance`;
const btc_addr_endpoint = (addr) => `https://api.blockcypher.com/v1/btc/main/addrs/${addr}`;
const btc_txs_endpoint = (txhash) => `https://api.blockcypher.com/v1/btc/main/txs/${txhash}?limit=50`;
const btc_forex_endpoint =  'https://blockchain.info/ticker';

// import http lib
import { getRequestWrapper } from './http.js';

// import system lib
import { sleep } from './system.js';
const sleep_time_in_ms = 500;

// add sleep to get request
async function _getRequestWrapper(url){
    await sleep(sleep_time_in_ms);
    return await getRequestWrapper(url);
}


export async function btc_usd_exchange_rate(){

    // send GET request
    const result = await _getRequestWrapper(btc_forex_endpoint)

    // extract price in USD
    let usd = 0.0;
    try {
        usd = result['USD']['last']
    }catch(err) { 
        console.error('could not get btc usd exchange rate');
    }

    return usd;
}

function hasCommonElement(arr1, arr2) {
    return arr1.some(item => arr2.includes(item));
}


async function get_full_transaction(tx_hash){

    // init variables
    let tx;
    let all_inputs = [];
    let all_outputs = [];

    // --- functions to retrieve inputs & outputs ---
    async function get_transaction_info(_tx_hash){

        // send get request
        tx = await _getRequestWrapper(btc_txs_endpoint(_tx_hash));

        // grab data
        const { inputs, outputs, next_inputs, next_outputs } = tx;

        // push inputs to array
        if (inputs !== undefined && Array.isArray(inputs) && inputs.length > 0){
            inputs.forEach(d => all_inputs.push(d));
        }

        // push outputs to array
        if (outputs !== undefined && Array.isArray(outputs) && outputs.length > 0){
            outputs.forEach(d => all_outputs.push(d));
        }

        return [next_inputs, next_outputs];
    }

    async function get_transaction_info_input(url){
        
        // send get request
        const tx_inputs_info = await _getRequestWrapper(url);

        // grab data
        const { inputs, next_inputs } = tx_inputs_info;

        // push to array
        if (inputs !== undefined && Array.isArray(inputs) && inputs.length > 0){
            inputs.forEach(d => all_inputs.push(d));
        }

        return next_inputs;
    }

    async function get_transaction_info_output(url){
        
        // send get request
        const tx_outputs_info = await _getRequestWrapper(url);

        // grab data
        const { outputs, next_outputs } = tx_outputs_info;

        // push to array
        if (outputs !== undefined && Array.isArray(outputs) && outputs.length > 0){
            outputs.forEach(d => all_outputs.push(d));
        }       

        return next_outputs;
    }

    // --- functions to run in continuous ---
    async function rerun_input(_next_inputs){
        if(typeof(_next_inputs) === 'string' && _next_inputs.length > 0){
            const __next_inputs = await get_transaction_info_input(_next_inputs);
            if(typeof(__next_inputs) === 'string' && __next_inputs.length > 0){
                return __next_inputs;
            }
        }
        return null;
    }

    async function rerun_output(_next_outputs){
        if(typeof(_next_outputs) === 'string' && _next_outputs.length > 0){
            const __next_outputs = await get_transaction_info_output(_next_outputs);
            if(typeof(__next_outputs) === 'string' && __next_outputs.length > 0){
                return __next_outputs;
            }
        }
        return null;
    }


    // --- launch ---
    let [next_inputs, next_outputs] = await get_transaction_info(tx_hash);

    while(true){
        next_inputs = await rerun_input(next_inputs);
        if (next_inputs === null) break;
    }

    while(true){
        next_outputs = await rerun_output(next_inputs);
        if (next_outputs === null) break;
    }


    // --- attach the full list of inputs & outputs to the transaction ---
    tx['inputs'] = all_inputs;
    tx['outputs'] = all_outputs;


    return tx;
}


export async function btc_addresses_lookup(btc_addresses) {

    // ----------------------------------------------------------------------
    // -------- Send GET requests to retrieve BTC addresses info ------------
    // ----------------------------------------------------------------------
    let results = {};
    for(const btc_addr of btc_addresses){

        // send GET request
        const result = await _getRequestWrapper(btc_addr_endpoint(btc_addr));
        if(result === undefined || result === null) return;

        // set
        results[btc_addr] = result;
    }


    // ----------------------------------------------------------------------
    // ----- Extract transaction hashes that our addr were involved in ------
    // ----------------------------------------------------------------------
    let tx_hashes = new Set();
    for(const btc_addr of Object.keys(results)){

        // grab data
        const { txrefs, unconfirmed_txrefs } = results[btc_addr];
        
        // push confirmed transactions    
        if(txrefs !== undefined && txrefs !== null && Array.isArray(txrefs) && txrefs.length > 0){    
            txrefs.forEach(tx => {
                tx_hashes.add(tx['tx_hash']);
            });
        }

        // push unconfirmed transactions
        if(unconfirmed_txrefs !== undefined && unconfirmed_txrefs !== null && Array.isArray(unconfirmed_txrefs) && unconfirmed_txrefs.length > 0){
            unconfirmed_txrefs.forEach(tx => {
                tx_hashes.add(tx['tx_hash']);
            });
        }
    }
    tx_hashes = [...tx_hashes];


    // ----------------------------------------------------------------------
    // ----------- Get full information about these transactions ------------
    // ----------------------------------------------------------------------
    let txs = {};
    for(const tx_hash of tx_hashes){
        txs[tx_hash] = await get_full_transaction(tx_hash);
    }    


    // --- Filter ---
    for(const tx_hash of Object.keys(txs)){
        
        // grab tx
        const tx = txs[tx_hash];

        // check if our btc addresses are the input to the transction
        const btc_is_an_input = tx['inputs'].filter(input => hasCommonElement(input['addresses'], btc_addresses)).length > 0;

        if(btc_is_an_input){
            console.log("AS INPUT")
            console.log(tx);
        }
    }

    // ----------------------------------------------------------------------
    // ----------------------- Build the ledger -----------------------------
    // ----------------------------------------------------------------------
   

    // // --- filter inputs & outputs ---
    // let m_inputs = all_inputs.filter(input => )
    // let m_outputs = all_outputs.filter(output => hasCommonElement(output['addresses'], btc_addresses))

    // // --- clean ---
    // m_inputs = m_inputs.map(({ addresses, output_value }) => { return { addresses, output_value } });
    // m_outputs = m_outputs.map(({ addresses, value }) => { return { addresses, value } });


    // return {
    //     'inputs': m_inputs,
    //     'outputs': m_outputs
    // }

    return results;
}


export async function btc_addresses_balance_lookup(btc_addresses) {

    // init the balance
    let balance = 0.0;

    // go through addresses
    for(const btc_addr of btc_addresses){

        // build url
        const url = btc_addr_balance_endpoint(btc_addr);

        // send GET request
        const result = await _getRequestWrapper(url)

        try {
            balance = balance + (+result['balance'])/100000000.0;
        }catch(err) {
            console.error(`could not extract balance for addr ${btc_addr}`);
        }
    }   

    return balance;
}
