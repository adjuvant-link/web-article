'use strict';

// ---------------- BlockCypher endpoints -----------------
// ref: https://www.blockcypher.com/dev/bitcoin/#address-api
const blockcypher_addr_balance_endpoint = (addr) => `https://api.blockcypher.com/v1/btc/main/addrs/${addr}/balance`;
const blockcypher_addr_endpoint = (addr) => `https://api.blockcypher.com/v1/btc/main/addrs/${addr}`;
const blockcypher_txs_endpoint = (tx_hash) => `https://api.blockcypher.com/v1/btc/main/txs/${tx_hash}?limit=50`;


// --------------- Blockchain Info endpoints --------------
// ref: https://www.blockchain.com/api/blockchain_api
const btc_forex_endpoint = 'https://blockchain.info/ticker';



// ------------------- Dependencies -----------------------
// import system lib
import { sleep } from './system.js';
const sleep_time_in_ms = 1000;

// prompt lib
import swal from 'sweetalert'

// API endpoints will block your IP if you send too many requests
// we add some sleep time
async function getRequestWrapper(url){
    await sleep(sleep_time_in_ms);
    
    const results = await new Promise((resolve, reject) => {

        fetch(url, {})
        .then(response => response.json())
        .then(json => {
            resolve(json);
        })
        .catch(() => {
            swal({
                title: `Error`,
                text: `Could not reach url`
            })
            return reject(`could not reach ${url}`)
        })
    })

    return results;
}


// ---------------- Helper Functions ----------------------
function hasCommonElement(arr1, arr2) {
    return arr1.some(item => arr2.includes(item));
}


// -------------------- Functions -------------------------
export async function btc_usd_exchange_rate(){

    // send GET request
    const result = await getRequestWrapper(btc_forex_endpoint)

    // extract price in USD
    let usd = 0.0;
    try {
        usd = result['USD']['last']
    }catch(err) { 
        console.error('could not get btc usd exchange rate');
    }

    return usd;
}


async function get_full_tx(tx_hash){
    // a btc transaction can have thousands of inputs & outputs
    // the api implements pagination to retrieve all of it
    // this function runs recursively to obtain everything


    // init variables
    let tx;
    let all_inputs = [];
    let all_outputs = [];


    // --- functions to retrieve inputs & outputs ---
    async function get_transaction_info(_tx_hash){

        // send get request
        tx = await getRequestWrapper(blockcypher_txs_endpoint(_tx_hash));
        if(tx === undefined || tx === null) return [null, null];

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
        const tx_inputs_info = await getRequestWrapper(url);

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
        const tx_outputs_info = await getRequestWrapper(url);

        // grab data
        const { outputs, next_outputs } = tx_outputs_info;

        // push to array
        if (outputs !== undefined && Array.isArray(outputs) && outputs.length > 0){
            outputs.forEach(d => all_outputs.push(d));
        }       

        return next_outputs;
    }


    // --- functions to run in continuous ---
    async function rerun_inputs(_next_inputs){
        if(typeof(_next_inputs) === 'string' && _next_inputs.length > 0){
            const __next_inputs = await get_transaction_info_input(_next_inputs);
            if(typeof(__next_inputs) === 'string' && __next_inputs.length > 0){
                return __next_inputs;
            }
        }
        return null;
    }

    async function rerun_outputs(_next_outputs){
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
        next_inputs = await rerun_inputs(next_inputs);
        if (next_inputs === null) break;
    }
    while(true){
        next_outputs = await rerun_outputs(next_inputs);
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
        const result = await getRequestWrapper(blockcypher_addr_endpoint(btc_addr));
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
        txs[tx_hash] = await get_full_tx(tx_hash);
    }    


    // ----------------------------------------------------------------------
    // ----- Build a ledger with our transactions' relevant information  ----
    // ----------------------------------------------------------------------
    let txs_df = [];
    for(const tx_hash of Object.keys(txs)){

        // grab tx
        const tx = txs[tx_hash];

        // grab the date when the transaction was received by the network
        const time = new Date(tx['received']);

        // clean the inputs & outputs – only keep relevant information
        const inputs = tx['inputs'].map(input => { 
            return {
                'value': +input['output_value'], 
                'addresses': input['addresses']
            }
        })

        const outputs = tx['outputs'].map(output => {
            return {
                'value': +output['value'], 
                'addresses': output['addresses']
            }
        });

        // get inputs or outputs that mention our btc addresses
        let m_inputs = inputs.filter(input => hasCommonElement(input['addresses'], btc_addresses));
        let m_outputs = outputs.filter(output => hasCommonElement(output['addresses'], btc_addresses));

        // if we are input, we keep track of all outputs
        if(m_inputs.length > 0){
            m_outputs = outputs;
        }
        
        // init datum
        let datum = {
            'tx_hash': tx_hash,
            'time': time,
            'inputs': m_inputs,
            'outputs': m_outputs
        }

        // push to dataframe
        txs_df.push(datum);
    }

    return txs_df;
}


export async function btc_addresses_balance_lookup(btc_addresses) {

    // init the balance
    let balance = 0.0;

    // go through addresses
    for(const btc_addr of btc_addresses){

        // build url
        const url = blockcypher_addr_balance_endpoint(btc_addr);

        // send GET request
        const result = await getRequestWrapper(url)

        try {
            balance = balance + (+result['balance'])/100000000.0;
        }catch(err) {
            console.error(`could not extract balance for addr ${btc_addr}`);
        }
    }   

    return balance;
}
