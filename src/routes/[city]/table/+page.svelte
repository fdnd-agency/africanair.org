<script>
  let { data } = $props();
</script>

<main>
  {#each data.data as item}
  <ul>
    <li>{item.sampling_point.location}</li>
    <li>{item.tube.city.name}</li>
    <li>{item.date}</li>
    <li>{item.value}</li>
  </ul>
  {/each}
</main>

<style>
  ul {
    margin-bottom: 1rem;
  }
</style>
