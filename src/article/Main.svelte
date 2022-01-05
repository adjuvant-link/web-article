<script>

    // load constants
    import { TITLE, DESCRIPTION, SUBDIRECTORY, AUTHOR, AUTHOR_URL } from '../constants.json';

</script>


<div class="scroll-container">

    <!-- Cover Page -->
    <section style="z-index: 2;">

        <!-- Image -->
        <div id="top-img-container">
            <img alt="cover photo" src="{SUBDIRECTORY}assets/images/cover.jpg" />
            <!-- <p></p> -->
        </div>

        <!-- Title -->
        <div class="spacing-before-title"></div>

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

        <div class="spacing-before-report"></div>

    </section>


    <!-- Slide #1 -->
    <section>

        <div class="img-container">
            <img alt="paper background" src="{SUBDIRECTORY}assets/images/paper-texture.jpg"/>
        </div>

        <div class="text-container">

            <p class="title">Adjuvant</p>

            <p>
                a substance which enhances the body's immune response to a toxin or other foreign substance.
            </p>
            <p>
                from Latin adjuvare, ad- ‘towards’ + juvare to ‘help’.
            </p>

            <br><br>
        </div>

    </section>


    <!-- Slide #2 -->
    <section>

        <div class="img-container">
            <img alt="paper background" src="{SUBDIRECTORY}assets/images/paper-texture.jpg"/>
        </div>

        <div class="text-container">

            <p>

            </p>

            <br><br>
        </div>

    </section>


</div>



<style>

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
    .spacing-before-title {
        height: 30vh;
    }

    .spacing-before-report {
        height: 40vh;
    }

    .top-title-container {
        z-index: 3;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        margin: 0px auto;
        height: 30vh;
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
    }

    .top-subtitle {
        margin: 0px;
        padding: 0px;
        font-weight: var(--font-weight-normal);
        font-size: var(--font-size-small);
    }

    /* styles for browsers smaller than 600px; */
    @media (max-width : 599px) {
        .spacing-before-title {
            height: 17vh;
        }
        .spacing-before-report {
            height: 17vh;
        }   
        .top-title-container {
            height: 66vh;
        }
        .top-title {
            font-size: var(--font-size-large);
        }
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