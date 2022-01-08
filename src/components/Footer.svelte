<script>

    // load constants
    import { EMAIL } from '../constants.json';

    // load libs
    import { isMobile } from '../libs/system.js';

</script>


<div class="footer-up">
    <hr>
    <p style="margin-top: 8px; margin-bottom: 8px;">For any inquiries contact me at <a href='mailto:{EMAIL}' target='_blank'>{EMAIL}</a></p>

    {#if !isMobile()}
        <p style="margin-bottom: 8px;"><a href='/assets/files/pgp.pub.txt' target='_blank'>PGP Public Key</a></p>
    {/if}
</div>


<style>

    div {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: var(--footer-height);
        text-align: center;
        margin: 0px auto;
        padding: 0px;
        background-color: var(--black);
        z-index: 999;
    }

    hr {
        max-width: 100%;
        margin: 0px auto;
        padding: 0px;
        border-width: 0px;
        opacity: 1.0;
        border-bottom: 1px solid var(--white);
    }

    p {
        margin: 0px 0px 0px;
        padding: 0px;
        font-size: var(--font-size-very-small);
        font-weight: var(--font-weight-light);
    }

    a {
        margin: 0px 0px 0px;
        padding: 0px;
        font-size: var(--font-size-very-small);
        font-weight: var(--font-weight-light);
    }


</style>