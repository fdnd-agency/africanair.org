<script>
  import DateDropdown from "$lib/components/atoms/DateDropdown.svelte";
  import SearchBar from "$lib/components/atoms/SearchBar.svelte";
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
  <div class="wrapper">
    <DateDropdown />
    <DateDropdown />
    <SearchBar />
  </div>
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
