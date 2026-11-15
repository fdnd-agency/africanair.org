<script>
  import Disclaimer from "$lib/assets/images/Disclaimer.svg"
</script>

<section>
  <img src={Disclaimer} alt="Disclaimer svg">

  <h2>Disclaimer</h2>

  <p>
    use this data at your own risk. We aim for quality, but we cannot guarantee
    completeness, accuracy, or fitness for a particular purpose. This is not an
    official monitoring network and should not be used as legal or medical
    evidence.
  </p>
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
    width: 100%;
    /* max-width: 22rem; */
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-m);

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
  }
</style>
