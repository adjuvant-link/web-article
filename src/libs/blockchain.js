'use strict';

// --------------- Blockchain Info endpoints --------------
// ref: https://www.blockchain.com/api/blockchain_api
const blockchain_addr_endpoint = (addr) => `https://blockchain.info/rawaddr/${addr}`;
const blockchain_tx_endpoint = (tx_hash) => `https://blockchain.info/rawtx/${tx_hash}`;
const btc_forex_endpoint = 'https://blockchain.info/ticker';


// ------------------- Dependencies -----------------------
// import system lib
import { sleep } from './system.js';
const sleep_time_in_ms = 1000;

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
    })

    return results;
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


export async function btc_addresses_lookup(btc_addresses) {

    // ----------------------------------------------------------------------
    // -------- Send GET requests to retrieve BTC addresses info ------------
    // ----------------------------------------------------------------------
    let results = {};
    for(const btc_addr of btc_addresses){

        // send GET request
        const result = await getRequestWrapper(blockchain_addr_endpoint(btc_addr));
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
        const { txs } = results[btc_addr];
        
        // push confirmed transactions    
        if(txs !== undefined && txs !== null && Array.isArray(txs) && txs.length > 0){    
            txs.forEach(tx => {
                tx_hashes.add(tx['hash']);
            });
        }

        // // push unconfirmed transactions
        // if(unconfirmed_txrefs !== undefined && unconfirmed_txrefs !== null && Array.isArray(unconfirmed_txrefs) && unconfirmed_txrefs.length > 0){
        //     unconfirmed_txrefs.forEach(tx => {
        //         tx_hashes.add(tx['tx_hash']);
        //     });
        // }
    }
    tx_hashes = [...tx_hashes];


    // ----------------------------------------------------------------------
    // ----------- Get full information about these transactions ------------
    // ----------------------------------------------------------------------
    let txs = {};
    for(const tx_hash of tx_hashes){
        txs[tx_hash] = await getRequestWrapper(blockchain_tx_endpoint(tx_hash));
    }


    // ----------------------------------------------------------------------
    // ----- Build a ledger with our transactions' relevant information  ----
    // ----------------------------------------------------------------------
    let txs_df = [];
    for(const tx_hash of Object.keys(txs)){

        // grab tx
        const tx = txs[tx_hash];
        console.log(tx);

        // grab the date when the transaction was received by the network
        const time = tx['time'];

        // clean the inputs & outputs – only keep relevant information
        const inputs = tx['inputs'].map(input => { 
            const value = input['prev_out']['value']
            const addr = input['prev_out']['addr'];
            return { value, addr } 
        })

        const outputs = tx['out'].map(({ value, addr }) => { return { value, addr } });

        // get inputs or outputs that mention our btc addresses
        let m_inputs = inputs.filter(input => btc_addresses.includes(input['addr']));
        let m_outputs = outputs.filter(output => btc_addresses.includes(output['addr']));

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
