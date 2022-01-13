<script>

    // properties
    export let indexes;

    // load constants
    import { SUBDIRECTORY } from '../constants.json';

</script>

<!-- Slides -->
{#each indexes as index}
    <section>
        <div class="slide-container">
            <img alt="slide #{index}" src="{SUBDIRECTORY}assets/slides/{index}.svg"/>
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