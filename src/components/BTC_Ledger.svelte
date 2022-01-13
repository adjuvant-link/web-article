<script>

    // properties
    export let wallet;

    // load constants
    import { BTC_REFRESH_IN_SEC } from '../constants.json';

    // ui lib
    import { onMount } from 'svelte';

    // import btc lib
    import { btc_usd_exchange_rate, btc_addresses_lookup } from '../libs/btc.js';

    // import components
    import Table from './Table.svelte';

    // init process variables
    let total_balance_in_usd = 0.0;
    let donations = [];    


    async function get_donations_ledger(){

        // reset
        let total_balance_in_btc = 0.0;

        // get BTC to USD rate
        const usd_exchange_rate = await btc_usd_exchange_rate();
        if (usd_exchange_rate === undefined || usd_exchange_rate === null) return;

        // func to convert
        function convert_to_usd(btc_value){
            return Math.round(100.0 * usd_exchange_rate * btc_value)/100.0;
        }

        // get addresses info
        const btc_addr_info = await btc_addresses_lookup(wallet['addresses']);
        if (btc_addr_info === undefined || btc_addr_info === null) return;

        // build the donations table
        let _donations = [];
        Object.keys(btc_addr_info).forEach(addr_info => {

            // grab data
            const { balance, txs } = btc_addr_info[addr_info];

            // accumulate balance
            total_balance_in_btc = total_balance_in_btc + balance;

            // go through transactions
            txs.forEach(tx => {

                // compute value in USD
                const value = convert_to_usd(+tx['value']);

                // build table row
                const datum = [
                    tx['tx_hash'], 
                    value.toLocaleString(),
                    tx['spent'] === undefined ? 'N/A' : tx['spent'],
                    tx['confirmed']
                ]

                // push to table
                _donations.push(datum);
            })
        })

        // add headers
        _donations.unshift(['TX Hash', 'Value (USD)', 'Spent', 'Confirmed'])

        // convert total balance
        total_balance_in_usd = convert_to_usd(total_balance_in_btc).toLocaleString();

        return [total_balance_in_usd, _donations];
    }

    async function continuous(){
        console.log(`INFO: Refreshing info for wallet with id ${wallet['id']}`)

        // run
        const [balance, _donations] = await get_donations_ledger();   

        // set
        total_balance_in_usd = balance;
        donations = _donations;

        // rerun in X seconds
        setTimeout(async () => {   
            continuous();
        }, 1000*BTC_REFRESH_IN_SEC);
    }

    // load the btc info
    onMount(() => {
        continuous();
    })

</script>


<!-- Donations Ledger -->
<div class="container">
    <p class="subsubtitle" style="text-align: center; margin-bottom: 8px;">Donations</p>
    {#if donations !== undefined && donations !== null && Array.isArray(donations) && donations.length > 1 }
        <Table data={donations}/>
        <p>Total: {total_balance_in_usd} USD</p>
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