<script>

    // load constants
    import { SUBDIRECTORY } from '../constants.json';

    // import btc lib
    import { btc_usd_exchange_rate, btc_addr_lookup, btc_addr_balance_lookup } from '../libs/btc.js';

    // ui lib
    import { onMount } from 'svelte';

    // import components
    import Table from '../components/Table.svelte';

    // btc addresses
    const addr_1 = 'bc1q2hj8fvt5w7ytjrwqpuz2daye05mdhuen4jvfk5';
    let balance_1 = 0.0;
    let donations_1 = [];
    

    // load the btc info
    onMount(async () => {

        // get BTC to USD rate
        const usd_exchange_rate = await btc_usd_exchange_rate();

        // get addr info
        const btc_addr_info_1 = await btc_addr_lookup(addr_1);
        donations_1 = btc_addr_info_1['txrefs'].map(tx => [
            tx['tx_hash'], 
            (Math.round(100.0 * usd_exchange_rate * tx['value'] )/100.0).toLocaleString(),
            tx['spent']
        ] );
        donations_1.unshift(['TX Hash', 'Value (USD)', 'Spent'])

        // compute balance in usd
        balance_1 = (Math.round(100.0 * usd_exchange_rate * btc_addr_info_1['balance'])/100.0).toLocaleString();
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
                <img alt="portrait" src="{SUBDIRECTORY}assets/images/portrait.jpg"/>
                <p>Chris Levine, claims to show the back of Banksy's head, clad in a hoodie.</p>
                <p class="portrait-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend, dolor nec scelerisque sagittis, enim felis finibus justo, et faucibus ex metus ut arcu. In ut scelerisque felis. Quisque accumsan sollicitudin nisi eu imperdiet. Proin porttitor ex risus, sed sagittis nisi dapibus eu. Nunc posuere id nibh vitae tincidunt. Quisque mattis sem at ex varius, non elementum nunc vestibulum. Duis at est a velit accumsan tincidunt ac in lectus. Vivamus quis orci vitae turpis vulputate sodales. Nunc nec nunc nulla. Vivamus volutpat massa vitae condimentum laoreet. Ut sit amet lobortis leo. Suspendisse congue, lacus nec facilisis ornare, mi libero dictum dolor, nec aliquet ligula arcu vitae lectus. Ut quis ullamcorper tortor, quis tincidunt enim. Vestibulum nec nisi sapien. Vestibulum mollis in purus at tempor.
                </p>
            </div>
            
            <div class="column-right">
                <br>

                <!-- Donations Ledger -->
                <div class="container">
                    <p class="subsubtitle" style="text-align: center; margin-bottom: 8px;">Donations Ledger</p>
                    <Table data={donations_1}/>
                    <p>Total: {balance_1} USD</p>
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
                    <p class="btc-addr">BTC: {addr_1}</p>
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
    
    .column-left img {
        max-width: 30vw;
        max-height: 50vh;
        border: 1px solid var(--black);
    }

    .column-right {
        flex: 40%;
    }

    .btc-addr {
        font-size: var(--font-size-very-small);
    }

    .portrait-description {
        margin-top: 8px;
        overflow: scroll; 
        height: 72px;
        border: 1px solid var(--black);
        text-align: justify;
    }

</style>