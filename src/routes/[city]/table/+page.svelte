<script>
  let { data } = $props();
</script>

{#each data.data as data}
  <ul>
    <li>{data.sampling_point.location}</li>
    <li>{data.tube.city.name}</li>
    <li>{data.date}</li>
    <li>{data.value}</li>
  </ul>
{/each}

<style>
  ul {
    margin-bottom: 1rem;
  }
</style>
