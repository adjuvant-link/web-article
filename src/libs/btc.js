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

export async function btc_addr_lookup(btc_addr) {

    // build url
    const url = btc_addr_enpoint(btc_addr);

    // send GET request
    const result = await getRequestWrapper(url);

    // init 
    let datum = {};

    try {
        // set
        datum['balance'] = (+result['balance'])/100000000.0;

        // clean
        datum['txrefs'] = result['txrefs'].map(tx => {
            return {
                'value': (+tx['value'])/100000000.0,
                'tx_hash': tx['tx_hash'],
                'spent': tx['spent']
            }
        });

    }catch(err) {
        console.error(`could not get info for addr ${btc_addr}`)
    }

    return datum;
}

export async function btc_addr_balance_lookup(btc_addr) {

    // build url
    const url = btc_addr_balance_enpoint(btc_addr);

    // send GET request
    const result = await getRequestWrapper(url)

    // extract the balance
    let balance = 0.0;

    try {
        balance = (+result['balance'])/100000000.0;
    }catch(err) {
        console.error(`could not extract balance for addr ${btc_addr}`);
    }

    return balance;
}
