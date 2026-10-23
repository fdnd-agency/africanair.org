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
  <div class="wrapper">
    <DateDropdown />
    <DateDropdown />
    <SearchBar />
  </div>
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

  .wrapper {
    background: var(--background-secondary);
    padding: var(--spacing-l);
    display: grid;
    gap: var(--spacing-m);
    
    @media (min-width: 375px) {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
