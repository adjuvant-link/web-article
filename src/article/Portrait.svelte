<script>

    // properties
    export let wallet;

    // load constants
    import { SUBDIRECTORY, BTC_REFRESH_IN_SEC } from '../constants.json';

    // ui lib
    import { onMount } from 'svelte';

    // import btc lib
    import { btc_usd_exchange_rate, btc_addr_lookup } from '../libs/btc.js';

    // import components
    import Table from '../components/Table.svelte';
    import ImageContainer from '../components/ImageContainer.svelte';

    // init process variables
    let usd_exchange_rate = 0.0;
    let total_balance_in_btc = 0.0;
    let total_balance_in_usd = 0.0;
    let donations = [];    

    function convert_to_usd(btc_value){
        return Math.round(100.0 * usd_exchange_rate * btc_value)/100.0;
    }


    async function get_donations_ledger(){

        // reset
        total_balance_in_btc = 0.0;

        // get BTC to USD rate
        usd_exchange_rate = await btc_usd_exchange_rate();

        // get addresses info
        const btc_addr_info = await btc_addr_lookup(wallet['addresses']);

        // build the donations table
        let _donations = [];
        Object.keys(btc_addr_info).forEach(addr_info => {

            // grab data
            const { balance, txrefs } = btc_addr_info[addr_info];

            // accumulate balance
            total_balance_in_btc = total_balance_in_btc + balance;

            // go through transactions
            txrefs.forEach(tx => {

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
        console.log(`refreshing info for wallet with id ${wallet['id']}`)

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


<!-- Demonstration of article -->
<section>

    <div class="img-container">
        <img alt="paper background" src="{SUBDIRECTORY}assets/images/paper-texture.jpg"/>
    </div>

    <div class="text-container">
        <p class="title" style="margin: 0px; padding: 0px;">Portraits</p>
        <p class="subtitle" style="margin: 0px; padding: 0px;">of social good catalysts</p>

        <div class="row">
            <div class="column-left">
                <br>
                <ImageContainer 
                    src="{SUBDIRECTORY}assets/images/portrait.jpg"
                    caption="Banksy's head, by Chris Levine"
                />
                <br>
                <p class="portrait-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend, dolor nec scelerisque sagittis, enim felis finibus justo, et faucibus ex metus ut arcu. In ut scelerisque felis. Quisque accumsan sollicitudin nisi eu imperdiet. Proin porttitor ex risus, sed sagittis nisi dapibus eu. Nunc posuere id nibh vitae tincidunt. Quisque mattis sem at ex varius, non elementum nunc vestibulum. Duis at est a velit accumsan tincidunt ac in lectus. Vivamus quis orci vitae turpis vulputate sodales. Nunc nec nunc nulla. Vivamus volutpat massa vitae condimentum laoreet. Ut sit amet lobortis leo. Suspendisse congue, lacus nec facilisis ornare, mi libero dictum dolor, nec aliquet ligula arcu vitae lectus. Ut quis ullamcorper tortor, quis tincidunt enim. Vestibulum nec nisi sapien. Vestibulum mollis in purus at tempor.
                </p>
            </div>
            
            <div class="column-right">
                <br>

                <!-- Donations Ledger -->
                <div class="container">
                    <p class="subsubtitle" style="text-align: center; margin-bottom: 8px;">Donations Ledger</p>
                    {#if donations !== undefined && donations !== null && Array.isArray(donations) && donations.length > 1 }
                        <Table data={donations}/>
                        <p>Total: {total_balance_in_usd} USD</p>
                    {/if}
                </div>

                <!-- BTC Address -->
                <div class="container" style="margin-top: 32px;">
                    <div style="margin-bottom: 8px;">
                        <a class="_mbutton"
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

            </div>
        </div>            
    </div>    
</section>



<style>

    /* ----- Overriding Coinbase's Donate Button Style ----- */
    ._mbutton {
        background: var(--main-color) !important;
        border-radius: 6px;
        padding: 9px 15px 11px 15px;
        text-decoration: none;
    }

    ._mbutton:hover { 
        background: var(--main-color-dark) !important;
    }
    /* ---------------------------------- */

    .container {
        text-align: center;
        margin: 0px;
    }

    /* Slides */
    .img-container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }

    .img-container img {
        width: 100%;
        height: 100%;
    }

    /* Text */
    .text-container {
        position: absolute;
        top: 8vh;
        bottom: 8vh;
        left: 0px;
        right: 0px;
        padding: 32px 96px;
        text-align: left;
        overflow-y: scroll;
    }

    .text-container p {
        color: var(--black);
    }
    
    .row {
        display: flex;
    }

    .column-left {
        flex: 60%;
        text-align: center;
        overflow-y: scroll;
    }

    .column-right {
        flex: 40%;
    }

    .btc-addr {
        font-size: var(--font-size-very-small);
    }

    .portrait-description {
        margin: 0px auto;
        overflow: scroll; 
        max-height: 8vh;
        max-width: 40vw;
        text-align: justify;
    }

</style>