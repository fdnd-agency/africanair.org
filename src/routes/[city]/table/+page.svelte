<script>
  import MeasurementListItem from "$lib/components/molecules/MeasurementListItem.svelte";
  import Viewtoggle from "$lib/components/molecules/Viewtoggle.svelte";
  import DatePicker from '$lib/components/DatePicker.svelte';

  let { data } = $props();
  const { points } = data;
</script>

<svelte:head>
  <title>Air Quality Measurements - Table View</title>
</svelte:head>

<main>
  <Viewtoggle />
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
