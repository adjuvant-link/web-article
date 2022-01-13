<script>

    // load constants
    import { TITLE, DESCRIPTION, SUBDIRECTORY, AUTHOR, AUTHOR_URL } from '../constants.json';

</script>

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


<style>

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

</style>