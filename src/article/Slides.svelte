<script>

    // load constants
    import { SUBDIRECTORY } from '../constants.json';

    // slides
    const slides = [
        {
            'alt': 'slide 1 - background',
            'src': `${SUBDIRECTORY}assets/slides/1.svg`
        },
        {
            'alt': 'slide 2 - background',
            'src': `${SUBDIRECTORY}assets/slides/2.svg`
        },
        {
            'alt': 'slide 3 - problem statement',
            'src': `${SUBDIRECTORY}assets/slides/3.svg`
        },
        {
            'alt': 'slide 4 - problem statement',
            'src': `${SUBDIRECTORY}assets/slides/4.svg`
        },
        {
            'alt': 'slide 5 - solution',
            'src': `${SUBDIRECTORY}assets/slides/5.svg`
        },
        {
            'alt': 'slide 6 - functional requirements',
            'src': `${SUBDIRECTORY}assets/slides/6.svg`
        },
        {
            'alt': 'slide 7 - interoperable',
            'src': `${SUBDIRECTORY}assets/slides/7.svg`
        },
        {
            'alt': 'slide 8 - how',
            'src': `${SUBDIRECTORY}assets/slides/8.svg`
        },
        {
            'alt': 'slide 9 - how',
            'src': `${SUBDIRECTORY}assets/slides/9.svg`
        },
    ]

</script>

<!-- Slides -->
{#each slides as slide}
    <section>
        <div class="slide-container">
            <img alt={slide['alt']} src={slide['src']}/>
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