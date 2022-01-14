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


    async function continuous(){
        console.log(`INFO: Refreshing info for wallet with id ${wallet['id']}`)

        // get BTC to USD rate
        const usd_exchange_rate = await btc_usd_exchange_rate();
        if (usd_exchange_rate === undefined || usd_exchange_rate === null) return;

        // func to convert
        function convert_to_usd(btc_value){
            return Math.round(100.0 * usd_exchange_rate * (btc_value/100000000.0))/100.0;
        }

        // get addresses info
        const ledger = await btc_addresses_lookup(wallet['addresses']);
        if (ledger === undefined || ledger === null) return;

        // convert to usd
        let ledger_usd = ledger.map(d => [d[0], convert_to_usd(d[1]), d[2]])

        // set balance
        total_balance_in_usd = ledger_usd.map(d => d[1]).reduce((a, b) => a + b, 0);

        // append headers
        ledger_usd.unshift(['Time', 'Value (USD)', 'Addresses'])

        // set ledger
        donations = ledger_usd;

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