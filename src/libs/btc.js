'use strict';

// api information for the bitcoin node provider
// https://www.blockcypher.com/dev/bitcoin/#address-api
const btc_addr_balance_enpoint = (addr) => `https://api.blockcypher.com/v1/btc/main/addrs/${addr}/balance`;
const btc_addr_enpoint = (addr) => `https://api.blockcypher.com/v1/btc/main/addrs/${addr}`;
const btc_forex_endpoint =  'https://blockchain.info/ticker';

// import http lib
import { getRequestWrapper } from './http.js';

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

export async function btc_addr_lookup(btc_addresses) {

    // init returned datum
    let datum = {};

    // go through addresses
    for(const btc_addr of btc_addresses){
        
        // set
        datum[btc_addr] = {};
        
        // build url
        const url = btc_addr_enpoint(btc_addr);

        // send GET request
        const result = await getRequestWrapper(url);

        // extrat values from payload
        try {

            // grab data
            const { balance, final_balance, txrefs, unconfirmed_txrefs } = result;

            // init transactions
            datum[btc_addr]['txrefs'] = [];

            // set balance
            datum[btc_addr]['balance'] = final_balance !== undefined ? (+final_balance)/100000000.0 : (+balance)/100000000.0;

            // push confirmed transactions    
            if(txrefs !== undefined && txrefs !== null 
                && Array.isArray(txrefs) && txrefs.length > 0){    

                txrefs.forEach(tx => {
                    datum[btc_addr]['txrefs'].push({
                        'value': (+tx['value'])/100000000.0,
                        'tx_hash': tx['tx_hash'],
                        'spent': tx['spent'],
                        'time': new Date(tx['confirmed']),
                        'confirmed': true
                    })
                });
            }

            // push unconfirmed transactions
            if(unconfirmed_txrefs !== undefined && unconfirmed_txrefs !== null 
                && Array.isArray(unconfirmed_txrefs) && unconfirmed_txrefs.length > 0){
                
                    unconfirmed_txrefs.forEach(tx => {
                    datum[btc_addr]['txrefs'].push({
                        'value': (+tx['value'])/100000000.0,
                        'tx_hash': tx['tx_hash'],
                        'spent': tx['spent'],
                        'time': new Date(tx['received']),
                        'confirmed': false
                    })
                });
            }
            

            // sort transactions in descending chronological order
            datum[btc_addr]['txrefs'].sort((b, a) => a['time'] - b['time']);

        }catch(err) {
            console.error(err);
            console.error(`could not get info for addr ${btc_addr}`)
        }
    }

    return datum;
}

export async function btc_addr_balance_lookup(btc_addresses) {

    // init the balance
    let balance = 0.0;

    // go through addresses
    for(const btc_addr of btc_addresses){

        // build url
        const url = btc_addr_balance_enpoint(btc_addr);

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
