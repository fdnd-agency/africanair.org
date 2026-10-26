<script>
  import MeasurementListItem from "$lib/components/molecules/MeasurementListItem.svelte";
  import Viewtoggle from "$lib/components/molecules/Viewtoggle.svelte";
  import DatePicker from '$lib/components/molecules/DatePicker.svelte';

  let { data } = $props();
  const { points } = data;
</script>

<svelte:head>
  <title>Air Quality Measurements - Table View</title>
</svelte:head>

<main>
  <Viewtoggle />
  <section>
    {#each points as point}
      <MeasurementListItem {point} />
    {/each}
  </section>
</main>

<style>
  main {
    /* display: grid; */
    /* gap: var(--spacing-m); */
    /* padding: var(--spacing-m); */

    section {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-m);
      padding-inline: var(--spacing-m);
      padding-top: var(--spacing-m);
    }
  }
</style>
