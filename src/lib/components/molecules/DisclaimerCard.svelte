<script>
  import Disclaimer from "$lib/assets/images/Disclaimer.svg";
</script>

<section>
  <img src={Disclaimer} alt="Disclaimer svg" />

  <details>
    <summary>Disclaimer</summary>
    <p>
      use this data at your own risk. We aim for quality, but we cannot
      guarantee completeness, accuracy, or fitness for a particular purpose.
      This is not an official monitoring network and should not be used as legal
      or medical evidence.
    </p>
  </details>
</section>

<style>
  section {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    /* gap: var(--spacing-xl); */
    padding: var(--spacing-m);
    max-width: 27rem;
    background-color: var(--background-secondary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-m);

    img {
      width: 2rem;
      height: auto;
    }

    details {
      /* border: 2px solid var(--border-color); */
      border-radius: var(--border-radius-m);

      summary {
        display: flex;
        align-items: center;
        gap: var(--spacing-s);
        padding: var(--spacing-s);
        cursor: pointer;
        list-style: none;
        font-weight: bold;
        font-size: 1.25rem;

        &::after {
          content: "";
          width: var(--spacing-xs);
          height: var(--spacing-xs);
          border-right: 2px solid currentColor;
          border-bottom: 2px solid currentColor;
          transform: rotate(45deg);
          transition: transform 0.2s ease;
        }
      }
      &[open] > summary:after {
        transform: rotate(-135deg);
      }
    }
  }
</style>
