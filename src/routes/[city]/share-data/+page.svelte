<script>
  import ApiDocumentationCard from "$lib/components/molecules/ApiDocumentationCard.svelte";
  import DisclaimerCard from "$lib/components/molecules/DisclaimerCard.svelte";
  import DataCard from "$lib/components/molecules/DataCard.svelte";
  import DownloadCard from "$lib/components/molecules/DownloadCard.svelte";

  let { data } = $props();
</script>

<main>
  <h1>Share data</h1>

  <section>
    <!-- Requesting the API -->
    <DataCard />

    <!-- Dataset download -->
    <DownloadCard downloads={data.downloads} />
  </section>

  <!-- API documentation -->
  <ApiDocumentationCard documentation={data.documentation} />

  <!-- Disclaimer -->
  <DisclaimerCard />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
    padding-inline: var(--spacing-m);

    h1 {
      border-radius: var(--border-radius-m);
    }

    section {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-m);
      @media (width > 768px) {
        gap: 2.5rem;
        place-content: center;
      }
    }
  }
</style>
