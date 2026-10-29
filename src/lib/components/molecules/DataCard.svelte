<script>
  import Document from "$lib/assets/images/Document.svg"
  import Button from "$lib/components/atoms/Button.svelte"
</script>

<section>
  <img src={Document} alt="Document svg">

  <h2>Data & API</h2>

  <p>
    Access the kumasi measurement dataset and use the public API for research,
    analysis and integration.
  </p>

  <Button>Request API</Button>
</section>

<style>
  section {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: var(--spacing-m);
    row-gap: var(--spacing-s);
    padding: var(--spacing-l) var(--spacing-m);
    background-color: var(--background-secondary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-m);
    max-width: 30rem;

    img {
      width: 2rem;
      height: auto;
    }

    h2 {
      font-size: var(--font-size-m);
    }

    p {
      grid-column: 2;
      text-wrap: balance;
    }

    /* Because the button is a component */
    > :global(:last-child) {
      grid-column: 1 / -1;
      padding-top: 0.75rem;
    }
  }
</style>
