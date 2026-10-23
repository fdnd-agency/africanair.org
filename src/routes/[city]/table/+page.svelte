<script>
  import MeasurementListItem from "$lib/components/molecules/MeasurementListItem.svelte";

  let { data } = $props();
  const { points } = data;
</script>

<svelte:head>
  <title>Air Quality Measurements - Table View</title>
</svelte:head>

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
