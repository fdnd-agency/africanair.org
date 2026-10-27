<script>
  import MeasurementListItem from "$lib/components/molecules/MeasurementListItem.svelte";
  import Viewtoggle from "$lib/components/molecules/Viewtoggle.svelte";
  import DatePicker from "$lib/components/molecules/DatePicker.svelte";

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
    max-width: 64ch;
  }

  section {
    display: grid;
    gap: var(--spacing-m);
    padding: var(--spacing-m);
  }
</style>
