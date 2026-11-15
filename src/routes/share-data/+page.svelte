<script>
  import ApiDocumentationCard from "$lib/components/molecules/ApiDocumentationCard.svelte"
  import DisclaimerCard from "$lib/components/molecules/DisclaimerCard.svelte"
  import DataCard from "$lib/components/molecules/DataCard.svelte"
  import DownloadCard from "$lib/components/molecules/DownloadCard.svelte"

  let { data } = $props()
</script>

<main>
  <h1>Share data</h1>

  <div>
    <!-- Requesting the API -->
    <DataCard />

    <!-- Dataset download -->
    <DownloadCard downloads={data.downloads} />

    <!-- Disclaimer -->
    <DisclaimerCard />
  </div>

  <!-- API documentation -->
  <ApiDocumentationCard documentation={data.documentation} />
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

    div {
      display: grid;
      gap: var(--spacing-m);
      @media (width > 768px) {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
</style>
