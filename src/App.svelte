<script>

    // load libs
    import { onMount } from 'svelte';

    // load constants
    import { TITLE } from './constants.json';

    // import components
    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';

    // import Article
    import Background from './article/Background.svelte';
    import Cover from './article/Cover.svelte';
    import Portrait from './article/Portrait.svelte';
    import Slides from './article/Slides.svelte';

    // load http lib
    import { getRequestWrapper } from './libs/http';

    // init variables
    let _scrollTop = 0;
    let _screenHeight = 0;
    let hide_cover = false
    let ready = false;
    let wallets = null;

    onMount(async () => {

        // set screen height
        _screenHeight = window.innerHeight;

        // wait for the whole UI to have loaded
        setTimeout(() => {

            // grab main
            const main = document.querySelector('.scroll-container');

            // monitor scrolling
            main.addEventListener('scroll', function(e){
                _scrollTop = main.scrollTop;
                hide_cover = _scrollTop > _screenHeight*0.1;
            })

        }, 200);


        // load wallets
        wallets = await getRequestWrapper('/assets/files/wallets.json');
        if (wallets === undefined || wallets === null) { console.error('could not load wallets'); return; };

        // set ready flag to TRUE
        ready = true;
    })

</script>


<!-- Set app name -->
<title>{TITLE}</title>

<!-- Header -->
<Header/>

<!-- Background (not on mobile) -->
<Background/>


<div class="scroll-container">

    <!-- Cover Page -->
    <Cover/>

    <!-- Slides -->
    <Slides indexes={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>

    <!-- Portraits -->
    {#if ready}
        {#each wallets as wallet}
            <Portrait wallet={wallet}/>
        {/each}
    {/if}

    <!-- Slides -->
    <!-- <Slides indexes={[11, 12, 13]}/> -->
    <Slides indexes={[11, 13]}/>

</div>


<!-- Footer -->
{#if hide_cover}
    <Footer/>
{/if}


<style>

    /* --- Fonts --- */
    @font-face {
        font-family: 'IM Fell Double Pica';
        src: url('/assets/fonts/IM_Fell_Double_Pica/IMFellDoublePica-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Special Elite';
        src: url('/assets/fonts/Special_Elite/SpecialElite-Regular.ttf') format('truetype');
    }


    /* --- CSS variables --- */
    :global(:root) {
        --black-dark: #000;
        --black: #222;
        --white: #eee;
        --white-dark: #999;
        --main-color: #aa0000;
        --main-color-dark: #7e0101;
        --header-height: 8vh;
        --footer-height: 8vh;
        --font-size-very-very-very-small: 0.65em;
        --font-size-very-very-small: 0.8em;
        --font-size-very-small: 0.9em;
        --font-size-small: 1.0em;
        --font-size-normal: 1.3em;
        --font-size-large: 1.8em;
        --font-size-very-large: 2.5em;
        --font-weight-bold: 600;
        --font-weight-normal: 400;
        --font-weight-light: 200;
    }


    /* --- General elements --- */    
    :global(body) {
        background-color: var(--black);
        font-family: 'IM Fell Double Pica', sans-serif;
        margin: 0px;
        padding: 0px;
    }

    :global(section){
        height: 100vh;
        scroll-snap-align: center;
        position: relative;
        text-align: center;
    }

    :global(::selection){
        background: var(--main-color);
        color: var(--white);
    }

    :global(p){
        color: var(--white);
        padding: 0px;
        margin: 0px;
        letter-spacing: 0.05em;
        word-spacing: 0.2em;
        line-height: 1.3em;
    }

    :global(a){
        color: var(--white);
        letter-spacing: 0.05em;
        word-spacing: 0.2em;
        line-height: 1.3em;
    }

    /* Text */
    :global(.title) {
        text-align: left;
        margin: 0px;
        margin-bottom: 8px;
        font-size: var(--font-size-very-large);
        max-width: var(--max-width);
        font-family: 'Special Elite', cursive;
    }

    :global(.subtitle) {
        text-align: left;
        margin: 0px;
        margin-bottom: 8px;
        font-size: var(--font-size-large);
        max-width: var(--max-width);
    }

    :global(.subsubtitle) {
        text-align: left;
        margin: 0px;
        font-size: var(--font-size-normal);
        max-width: var(--max-width);
    }

    /* sticky scroll container */
    .scroll-container {
        height: 100vh;
        overflow-y: scroll;
        scroll-snap-type: y mandatory;
    }


    /* --- Prompt (sweet alert) --- */
    :global(.swal-footer){
        text-align: center;
    }

    :global(.swal-button){
        background-color: var(--black-light);
        border-width: 0px;
        border: 1px solid var(--white);
        box-shadow: none;
    }

    :global(.swal-button:focus){
        box-shadow: none;
    }

    :global(.swal-button:not([disabled]):hover){
        background-color: var(--black-very-light);
    }

    :global(.swal-modal) {
        background-color: var(--black);
        border-width: 0px;
        border: 1px solid var(--white);
    }

    :global(.swal-title){
        color: var(--white);
        margin: 0px;
        padding: 0px;
    }

    :global(.swal-text){
        color: var(--white);
        margin: 0px;
        padding: 0px;
    }

</style>