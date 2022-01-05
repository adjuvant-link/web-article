<script>

    // properties
    export let src;
    export let alt;
    export let caption;

</script>

<div class="image-container">
    <img alt={alt} src={src}/>
    <p>{@html caption}</p>
</div>

<style>

    .image-container {
        margin: 32px auto;
        text-align: center;
    }

    img {
        max-width: var(--max-width-small);
        height: auto;
        margin: 0px;
        padding: 2px;
        border: 1px solid var(--white);
    }

    p {
        font-size: var(--font-size-very-very-small);
        text-decoration: underline;
    }


    /* styles for browsers smaller than 600px; */
    @media (max-width : 599px) {
        img {
            max-width: var(--max-width);
        }
    }

</style>