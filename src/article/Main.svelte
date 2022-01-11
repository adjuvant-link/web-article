<script>

    // load constants
    import { TITLE, DESCRIPTION, SUBDIRECTORY, AUTHOR, AUTHOR_URL } from '../constants.json';

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


<div class="scroll-container">

    <!-- Cover Page -->
    <section style="z-index: 2;">

        <!-- Image -->
        <div id="top-img-container">
            <img alt="cover photo" src="{SUBDIRECTORY}assets/images/cover.jpg" />
            <!-- <p></p> -->
        </div>

        <!-- Title Box -->
        <div class="top-title-container">
            <div class="vert-cell"></div>
            <div class="vert-cell">
                <p class="top-title">{TITLE}</p>
                <p class="top-subtitle">{DESCRIPTION}</p>
            </div>
            <div class="vert-cell"></div>
            <div class="vert-cell">
                <p style="margin-bottom: 8px;">by</p>
                <p class="authors"><a href={AUTHOR_URL} target="_blank">{AUTHOR}</a></p>
            </div>
            <div class="vert-cell"></div>
        </div>
        
    </section>


    <!-- Slides -->
    {#each slides as slide}
        <section>
            <div class="slide-container">
                <img alt={slide['alt']} src={slide['src']}/>
            </div>
        </section>
    {/each}


    <!-- Slide #1 -->
    <section>

        <div class="img-container">
            <img alt="paper background" src="{SUBDIRECTORY}assets/images/paper-texture.jpg"/>
        </div>

        <div class="text-container">

            <p class="title">Portraits of Social Good Catalysts</p>
            <p class="subtitle">Lebanon's Chapter</p>

            <!-- <p>
                a substance which enhances the body's immune response to a toxin or other foreign substance. 
                Latin adjuvare, ad- ‘towards’ + juvare to ‘help’.
            </p> -->

            <div class="container">
                <div>
                    <a class="donate-with-crypto _mbutton"
                        href="https://commerce.coinbase.com/checkout/1ec0654b-332a-486f-ae72-64952ebab05e">
                        Donate with Crypto
                    </a>
                    <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807"></script>
                </div>
            </div>


            <br><br>
        </div>

    </section>


    <!-- Slide Template -->
    <!-- <section>
        <div class="img-container">
            <img alt="paper background" src="{SUBDIRECTORY}assets/images/paper-texture.jpg"/>
        </div>
        <div class="text-container">
            <br><br>
        </div>
    </section> -->

</div>



<style>

    /* ----- Overriding Coinbase's Donate Button Style ----- */
    ._mbutton {
        background: var(--main-color) !important;
    }

    ._mbutton:hover { 
        background: var(--main-color-dark) !important;
    }
    /* ---------------------------------- */

    .container {
        text-align: center;
        margin: 32px;
    }

    .scroll-container {
        height: 100vh;
        overflow-y: scroll;
        scroll-snap-type: y mandatory;
    }

    section {
        height: 100vh;
        scroll-snap-align: center;
        position: relative;
        text-align: center;
    }

    /* Image */
    #top-img-container {
        position: absolute;
        top: var(--header-height);
        height: 92vh; /* 100vh - header height */
        z-index: -1;
    }

    #top-img-container img {
        height: 100%;
        width: auto;
        padding: 0px;
        margin: 0px;
        border-right: 1px solid var(--white);
        border-bottom: 1px solid var(--white);
    }

    #top-img-container p {
        position: absolute;
        bottom: 0vh;
        margin: 0px 8px;
        color: var(--white);
        font-size: var(--font-size-very-very-small);
    }

    /* styles for browsers smaller than 600px; */
    @media (max-width : 599px) {
        #top-img-container {
            right: 0px;
            text-align: right;
        }
    }
    @media (min-width : 599px) {
        #top-img-container {
            left: 0px;
            text-align: left;
        }
    }


    /* Title */
    .top-title-container {
        position: absolute;
        right: 4vw;
        bottom: 4vw;
        height: 33vh;
        z-index: 3;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: 8px 32px;
        max-width: 40vw;
        background-color: var(--black);
        opacity: 1;
        border: 1px solid var(--white);
        align-items: center;
        justify-content: space-between;
    }

    .authors {
        font-size: var(--font-size-small);
    }

    .vert-cell{
        height: 100%;
    }

    .top-title {
        margin: 0px;
        padding: 0px;
        margin-bottom: 8px;
        font-weight: var(--font-weight-normal);
        font-size: var(--font-size-very-large);
        font-family: 'Special Elite', cursive;
    }

    .top-subtitle {
        margin: 0px;
        padding: 0px;
        font-weight: var(--font-weight-normal);
        font-size: var(--font-size-small);
    }

    /* styles for browsers smaller than 600px; */
    @media (max-width : 599px) {
        .top-title-container {
            height: 66vh;
            top: 17vh;
            left: 0px;
            right: 0px;
            margin: 0px auto;
        }
        .top-title {
            font-size: var(--font-size-large);
        }
    }

    /* Slides */
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

</style>