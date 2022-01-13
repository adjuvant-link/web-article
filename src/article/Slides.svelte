<script>

    // properties
    export let indexes;

    // load constants
    import { SUBDIRECTORY } from '../constants.json';

    // import components
    import Loader from '../components/Loader.svelte';

    // keep track of the images that are loaded
    let loaded_images = {}
    indexes.forEach(index => { loaded_images[index] = false; })

</script>

<!-- Slides -->
{#each indexes as index}
    <section>
        <div class="slide-container">
            {#if !loaded_images[index]}
                <Loader/>
            {/if}
            <img on:load={() => { loaded_images[index] = true; }} alt="slide #{index}" src="{SUBDIRECTORY}assets/slides/{index}.svg"/>
        </div>
    </section>
{/each}


<style>

    .slide-container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        display: flex;
        justify-content: center;
    }

    .slide-container img {
        margin: auto;
        max-width: 100vw;
        max-height: 84vh;
    }

</style>