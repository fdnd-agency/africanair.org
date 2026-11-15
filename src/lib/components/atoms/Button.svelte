<script>
  let { children, ...rest } = $props()
</script>

<button>
  {@render children()}
</button>

<style>
  button {
    padding: var(--spacing-xs);
    width: 100%;
    border: none;
    border-radius: var(--border-radius-m);
    max-width: 15rem;
    margin: 0 auto;
    font-weight: bold;
    cursor: pointer;

    &:first-of-type {
      background-color: var(--primary);

      &:hover {
        background-color: hsl(205 100% 20%);
      }
    }
  }
</style>
