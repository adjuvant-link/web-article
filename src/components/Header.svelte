<script>

    // load constants from json file
    import { DESCRIPTION, SUBDIRECTORY, AUTHOR_URL } from '../constants.json';

    // load libs
    import { isMobile } from '../libs/system.js';

    // to set if we want the left icon
    const ICON_ON = false;

</script>

<!-- Header -->
<div class="header">
    {#if isMobile()}
        <div class="center-container">
            <div style="left: 0px; right: 0px; text-align: center;">
                <p>{DESCRIPTION}</p>
            </div>
        </div>
    {:else}
        <div class="center-container">
            {#if ICON_ON}
                <div style="left: 16px; cursor: pointer; z-index: 5;" on:click={() => window.open(AUTHOR_URL, '_blank')}>
                    <img id="logo" alt="logo" src="{SUBDIRECTORY}assets/images/favicon.png">
                </div>
            {/if}
            <div style="left: 0px; right: 0px; text-align: center;">
                <p>{DESCRIPTION}</p>
            </div>
            <div style="right: 16px;">
            </div>
        </div>
    {/if}
</div>


<style>

    .header {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        height: var(--header-height);
        padding: 0px;
        margin: 0px;
        border-bottom: 1px solid var(--white);
        background-color: var(--black);
        z-index: 999;
    }

    .center-container {
        position: absolute;
        display: inline-flex;
        left: 0px;
        right: 0px;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
    }

    .center-container div {
        position: absolute;
    }

    .header p {
        font-size: var(--font-size-very-very-small);
        font-weight: var(--font-weight-normal);
    }

    .header a {
        font-size: var(--font-size-very-small);
        margin-left: 16px;
    }

    .header img {
        max-height: 4vh;
        width: auto;
    }


</style>