<script>

    // properties
    export let wallet;

    // load constants
    import { BTC_REFRESH_IN_SEC } from '../constants.json';

    // ui lib
    import { onMount } from 'svelte';

    // import date time lib
    import { date_to_month_day_year } from '../libs/dt.js';

    // prompt lib
    import swal from 'sweetalert'

    // import btc lib
    import { btc_usd_exchange_rate, btc_addresses_lookup } from '../libs/blockcypher.js';
    // import { btc_usd_exchange_rate, btc_addresses_lookup } from '../libs/blockchain.js';

    // import components
    import Table from './Table.svelte';

    // init displayed variables
    let balance = 0.0;
    let table = [];   
    
    
    // helper function to convert btc to usd
    function convert_to_usd(btc_value, usd_exchange_rate){
        return Math.round(100.0 * usd_exchange_rate * (btc_value/100000000.0))/100.0;
    }

    function shortens_known_btc_addr(full_addr){
        return wallet['addresses'].includes(full_addr) ? `${full_addr.substring(full_addr.length - 6)}` : full_addr;
    }


    const cell_func = (cell, val, row_id, col_id) => {
        // make the "TX Hash" column clickable
        if (+col_id === 3){
            cell.style.cursor = 'pointer';
            cell.onclick = () => {
                swal({
                    title: 'Explore Transaction',
                    text: `Pressing ok will open a new tab`
                }).then(value => {
                    if (value) {
                        window.open(`https://www.blockchain.com/btc/tx/${val}`, '_blank')
                    }
                })
            }
        }
    }


    async function update_ledger(){
        console.log(`INFO: Refreshing donations table for wallet with id ${wallet['id']}`)

        // get BTC -> USD rate
        const usd_exchange_rate = await btc_usd_exchange_rate();
        if (usd_exchange_rate === undefined || usd_exchange_rate === null) return;

        // get the transactions for our addresses
        const df = await btc_addresses_lookup(wallet['addresses']);
        if (df === undefined || df === null || !Array.isArray(df) || df.length === 0) return;

        // init table & balance
        let _table = [];
        let _balance = 0.0;

        // convert to table
        df.forEach(d => {

            // grab data
            const { time, inputs, outputs, tx_hash } = d;

            // parse inputs
            let inputs_str = new Set();
            inputs.forEach(input => {
                input['addresses'].forEach(addr => { inputs_str.add(addr) })
            })
            inputs_str = [...inputs_str].map(s => shortens_known_btc_addr(s)).join(', ')

            // push to table
            outputs.forEach(output => {

                // grab data
                const { addresses, value } = output;

                // clean
                const value_usd = convert_to_usd(value, usd_exchange_rate);
                const _addresses = addresses.map(addr => shortens_known_btc_addr(addr)).join(', ');

                // check if positive or negative
                let neg = 1;
                addresses.forEach(addr => {
                    if(!wallet['addresses'].includes(addr)){
                        neg = -1;
                    }
                })

                // push 
                _table.push([
                    time, 
                    neg * value_usd,
                    inputs.length > 0 ? inputs_str : '',
                    _addresses, 
                    tx_hash
                ])
            })
        });

        // sort the transactions in descending chronological order
        _table.sort((a, b) => b[0] - a[1]);

        // compute balance
        _table.forEach(d => {
            _balance = _balance + d[1];
        })

        // remove time
        _table = _table.map(d => [d[1], d[2], d[3], d[4]]);

        // append the headers to our ledger
        _table.unshift(['Value (USD)', 'Sender', 'Receiver', 'TX Hash'])

        // set to displayed variables
        table = _table;
        balance = Math.round(_balance * 100.0)/100.0;
        
        // rerun in X seconds
        setTimeout(async () => {   
            await update_ledger();
        }, 1000*BTC_REFRESH_IN_SEC);
    }

    // load the btc info
    onMount(() => {
        update_ledger();
    })

</script>


<!-- Donations Ledger -->
<div class="container">
    <p class="subsubtitle" style="text-align: center; margin-bottom: 8px;">Donations</p>
    {#if table !== undefined && table !== null && Array.isArray(table) && table.length > 1 }
        <Table data={table} cell_func={cell_func}/>
        <p>Total: {balance} USD</p>
    {/if}
</div>

<br>

<!-- BTC Address -->
<div class="container" style="margin-top: 32px;">
    <div style="margin-bottom: 8px;">
        <a class="button"
            href="https://commerce.coinbase.com/checkout/1ec0654b-332a-486f-ae72-64952ebab05e">
            Donate with Crypto
        </a>
        <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807"></script>
    </div>
    <br>
    <p>BTC</p>
    {#each wallet['addresses'] as addr}
        <p class="btc-addr">{addr}</p>                    
    {/each}
</div>


<style>

    /* ----- Overriding Coinbase's Donate Button Style ----- */
    .button {
        background: var(--main-color) !important;
        border-radius: 6px;
        padding: 9px 15px 11px 15px;
        text-decoration: none;
    }

    .button:hover { 
        background: var(--main-color-dark) !important;
    }
    /* ---------------------------------- */

    .container {
        text-align: center;
        margin: 0px;
    }

    .btc-addr {
        font-size: var(--font-size-very-small);
    }

    p { 
        color: var(--black);
    }

</style>