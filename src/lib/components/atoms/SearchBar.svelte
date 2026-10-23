<script>
  let { points } = $props();
</script>

<form action="" method="GET">
  <!-- <input
    type="text"
    name="search"
    placeholder="Search location..."
    value={points.searchInput}
  /> -->
  <input
    type="text"
    name="search"
    placeholder="Search location..."
  />
</form>

<style>
  input {
    width: 100%;
    border: 1px solid var(--border-color);
    background-color: var(--background-primary);
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius-l);
    font-size: var(--font-size-s);

    &::placeholder {
      font-weight: 600;
    }
  }
</style>
