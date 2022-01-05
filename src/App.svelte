<script>

    // load libs
    import { onMount } from 'svelte';

    // load constants
    import { TITLE } from './constants.json';

    // import components
    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';

    // import Article
    import Article from './article/Main.svelte';

    // init variables
    let _scrollTop = 0;
    let _screenHeight = 0;
    let hide_cover = false

    onMount(() => {

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
    })

</script>


<!-- Set app name -->
<title>{TITLE}</title>

<!-- Header -->
<Header/>


<!-- Background (not on mobile) -->
<!-- <Background/> -->


<!-- Article -->
<Article/>


<!-- Footer -->
{#if hide_cover}
    <Footer/>
{/if}


<style>


    /* --- Fonts --- */
    @font-face {
        font-family: 'Elegant Typewriter';
        src: url('/assets/fonts/Elegant_Typewriter/ELEGANT-TYPEWRITER-Light.ttf') format('truetype');
    }

    /* --- CSS variables --- */
    :global(:root) {
        --black-dark: #000;
        --black: #222;
        --white: #eee;
        --white-dark: #999;
        --main-color: #aa0000;
        --header-height: 8vh;
        --footer-height: 8vh;
        --font-size-very-very-very-small: 0.65em;
        --font-size-very-very-small: 0.8em;
        --font-size-very-small: 0.9em;
        --font-size-small: 1.0em;
        --font-size-normal: 1.3em;
        --font-size-large: 1.8em;
        --font-size-very-large: 2em;
        --font-weight-bold: 600;
        --font-weight-normal: 400;
        --font-weight-light: 200;
    }


    /* --- General elements --- */    
    :global(body) {
        background-color: var(--black);
        font-family: 'Elegant Typewriter';
        margin: 0px;
        padding: 0px;
    }

    :global(::selection){
        background: var(--main-color);
        color: var(--white);
    }

    :global(p){
        color: var(--white);
        padding: 0px;
        margin: 0px;
    }

    :global(a){
        color: var(--white);
        padding: 0px;
        margin: 0px;
    }


    /* Text */
    :global(.title) {
        text-align: left;
        margin: 0em auto 0.5em;
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-very-large);
        max-width: var(--max-width);
    }

    :global(.subtitle) {
        text-align: left;
        margin: 1.0em auto 0.5em;
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-large);
        max-width: var(--max-width);
    }

    :global(.subsubtitle) {
        text-align: left;
        margin: 1.0em auto 0.5em;
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-normal);
        max-width: var(--max-width);
    }

</style>