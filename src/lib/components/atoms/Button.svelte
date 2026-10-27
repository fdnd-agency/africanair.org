<script>
    let {children, ...rest} = $props()
</script>

<button>
    {@render children()}
</button>

<style>
    button {
        padding: .5rem;
        width: 100%;
        border: none;
        border-radius: var(--border-radius-m);
    }
</style>