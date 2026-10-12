<script>
  import MeasurementListItem from "$lib/components/MeasurementListItem.svelte";

  let { data } = $props();
  const { points } = data;
</script>

<main>
  {#each points as point}
    <MeasurementListItem {point} />
  {/each}
</main>

<style>
  main {
    display: grid;
    gap: var(--spacing-m);
    padding: var(--spacing-m);
  }
</style>
