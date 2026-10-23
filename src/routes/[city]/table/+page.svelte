<script>
  import DateDropdown from "$lib/components/atoms/DateDropdown.svelte";
  import SearchBar from "$lib/components/atoms/SearchBar.svelte";
  import MeasurementListItem from "$lib/components/molecules/MeasurementListItem.svelte";

  let { data } = $props();
  const { points } = data;
</script>

<svelte:head>
  <title>Air Quality Measurements - Table View</title>
</svelte:head>

<main>
  <!-- <DateDropdown /> -->
  <SearchBar />
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
