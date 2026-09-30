<script>
  let { data } = $props();
</script>

<main>
  <article>
    <h2>Station name</h2>
    <p>Location - Date</p>
    <span>10.0</span>
    <small>µg/m</small>
    <span>Low</span>
  </article>

  <!-- {#each data.data as data}
    <ul>
      <li>{data.sampling_point.location}</li>
      <li>{data.tube.city.name}</li>
      <li>{data.date}</li>
      <li>{data.value}</li>
    </ul>
  {/each} -->
</main>

<style>
  ul {
    margin-bottom: 1rem;
  }

  article {
    background-color: var(--background-secondary);
    border: 1px solid var(--border-color);
    padding: var(--spacing-m);
    border-radius: var(--border-radius-m);
  }
</style>
