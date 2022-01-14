<script>

    // properties
    export let wallet;

    // load constants
    import { BTC_REFRESH_IN_SEC } from '../constants.json';

    // ui lib
    import { onMount } from 'svelte';

    // import date time lib
    import { date_to_month_day_year } from '../libs/dt.js';

    // import btc lib
    import { btc_usd_exchange_rate, btc_addresses_lookup } from '../libs/btc.js';

    // import components
    import Table from './Table.svelte';

    // init process variables
    let total_balance_in_usd = 0.0;
    let ledger = [];   
    
    
    // helper function to convert btc to usd
    function convert_to_usd(btc_value, usd_exchange_rate){
        return Math.round(100.0 * usd_exchange_rate * (btc_value/100000000.0))/100.0;
    }


    async function update_ledger(){
        console.log(`INFO: Refreshing donations ledger for wallet with id ${wallet['id']}`)

        // get BTC -> USD rate
        const usd_exchange_rate = await btc_usd_exchange_rate();
        if (usd_exchange_rate === undefined || usd_exchange_rate === null) return;

        // get the transaction ledger for our addresses
        const ledger = await btc_addresses_lookup(wallet['addresses']);
        if (ledger === undefined || ledger === null) return;
        
        // convert the ledger to USD, and make the date time more readable
        let ledger_usd = ledger.map(d => [ date_to_month_day_year(d[0]), convert_to_usd(d[1], usd_exchange_rate), d[2], d[3] ])
        
        // compute the total balance
        total_balance_in_usd = Math.round(ledger_usd.map(d => d[1]).reduce((a, b) => a + b, 0)*100.0)/100.0;

        // append the headers to our ledger
        ledger_usd.unshift(['Date', 'Value (USD)', 'Addresses', 'Flag'])

        // set ledger
        ledger = ledger_usd;

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
    {#if ledger !== undefined && ledger !== null && Array.isArray(ledger) && ledger.length > 1 }
        <Table data={ledger}/>
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