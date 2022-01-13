<script>

</script>

<div id="loader"></div>

<style>

    div {
        position: absolute;
        display: inline-block;
        left: 50%;
        top: 50%;
        margin-left: -76px;
        margin-top: -76px;
        border: 16px solid transparent; /* Light grey */
        border-top: 16px solid var(--main-color); /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
        z-index: 4;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

</style>