<script>
  import SearchBar from "$lib/components/atoms/SearchBar.svelte";
  import MeasurementListItem from "$lib/components/molecules/MeasurementListItem.svelte";
  import Viewtoggle from "$lib/components/molecules/Viewtoggle.svelte";
  import DatePicker from "$lib/components/molecules/DatePicker.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>Air Quality Measurements - Table View</title>
</svelte:head>

<main>
  <Viewtoggle />
  <div class="wrapper">
    <SearchBar value={data.searchInput}/>
  </div>
  <section>
    {#each data.points as point}
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
