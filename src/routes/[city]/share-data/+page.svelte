<script>
  import API from "$lib/assets/images/API.svg"
  import Cloud from "$lib/assets/images/Cloud.svg"
  import Disclaimer from "$lib/assets/images/Disclaimer.svg"
  import Document from "$lib/assets/images/Document.svg"
  import Button from "$lib/components/atoms/Button.svelte"

  let { data } = $props()
</script>

<main>
  <h1>Share data</h1>

  <!-- Requesting the API -->
  <section>
    <img src={Document} alt="">

    <h2>Data & API</h2>

    <p>
      Access the kumasi measurement dataset and use the public API for research,
      analysis and integration.
    </p>

    <Button>Request API</Button>
  </section>

  <!-- Dataset download -->
  <section>
    <img src={Cloud} alt="">

    <h2>Download</h2>

    <p>Downloads always return the full dataset and do not accept filters.</p>

    <Button>Download JSON</Button>
    <Button>Download CSV</Button>
    <Button>Download XLSX</Button>
  </section>

  <!-- API documentation -->
  <section>
    <img src={API} alt="API section logo">

    <h2>API documentation</h2>

    <p>Everything you need to integrate our API.</p>

    {#each data.documentation as d}
      <details>
        <summary>
          <p><strong>{d.title}</strong></p>
          <p><small>{d.text}</small></p>
          <code>/api/public/</code>
        </summary>

        {#if d.description}
          <p>{d.description}</p>
        {/if}

        {#if d.code}
          <ul>
            {#each d.code as c}
              <li>
                <code>{c}</code>
              </li>
            {/each}
          </ul>
        {/if}
      </details>
    {/each}
  </section>

  <!-- Disclaimer -->
  <section>
    <img src={Disclaimer} alt="">

    <details>
      <summary>Disclaimer</summary>
      <p>use this data at your own risk. We aim for quality, but we cannot guarantee completeness, accuracy, or fitness for a particular purpose. This is not an official monitoring network and should not be used as legal or medical evidence.</p>
    </details>
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-inline: 1rem;
    
    h1,
    section {
        padding-inline: 1rem;
        border-radius: var(--border-radius-m);
    }

    section {
      background-color: var(--background-secondary);
    }

    section:first-of-type {
    }
  }
</style>
