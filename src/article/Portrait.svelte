<script>

    // properties
    export let wallet;

    // load constants
    import { SUBDIRECTORY } from '../constants.json';

    // import components
    import ImageContainer from '../components/ImageContainer.svelte';
    import BTC_Ledger from '../components/BTC_Ledger.svelte';


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
                <BTC_Ledger wallet={wallet}/>
            </div>
        </div>            
    </div>    
</section>



<style>

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

    .portrait-description {
        margin: 0px auto;
        overflow: scroll; 
        max-height: 8vh;
        max-width: 40vw;
        text-align: justify;
    }

</style>