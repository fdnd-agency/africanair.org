<script>
  import Cloud from "$lib/assets/images/Cloud.svg";
  import Button from "$lib/components/atoms/Button.svelte";

  let { downloads } = $props();
</script>

<section>
  <img src={Cloud} alt="Cloud svg" />

  <h2>Download</h2>

  <p>Downloads always return the full dataset and do not accept filters.</p>

  <ul>
    {#each downloads as d}
      <Button href={d.href} download>Download {d.format}</Button>
    {/each}
  </ul>
</section>

<style>
  section {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: var(--spacing-m);
    row-gap: var(--spacing-m);
    align-items: center;
    padding: var(--spacing-l) var(--spacing-m);
    background-color: var(--background-secondary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-m);
    max-width: 27rem;

    img {
      width: 2rem;
      height: auto;
    }

    p {
      grid-column: 2;
      text-wrap: balance;
    }

    ul {
      grid-column: 1/-1;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-s);

      @media (width > 768px) {
        flex-direction: row;
      }
    }
  }
</style>
