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
        margin: 8px auto;
        text-align: center;
    }

    img {
        max-width: 40vw;
        max-height: 40vh;
        margin: 0px;
        border: 1px solid var(--black);
    }

    p {
        font-size: var(--font-size-very-very-small);
        text-decoration: underline;
        color: var(--black);
    }

</style>