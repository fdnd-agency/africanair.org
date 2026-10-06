<script>
  let { data } = $props();

  const { samplingPoints } = data;

  const dateRefactor = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };
</script>

<main>
  {#each samplingPoints as samplingPoint}
    <article>
      <span class="ellipse"></span>
      <h2>{samplingPoint.location}</h2>
      <p>
        {samplingPoint.city.name} - {dateRefactor(samplingPoint.date_updated)}
      </p>
      <span class="value">10.0</span>
      <small>µg/m³</small>
      <span class="status">Dangerous</span>
    </article>
  {/each}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    article {
      background-color: var(--background-secondary);
      border: 1px solid var(--border-color);
      padding: var(--spacing-m);
      border-radius: var(--border-radius-m);
      display: grid;
      align-items: center;
      grid-template-columns: 1fr auto;
      grid-template-areas:
        "station value"
        "station unit"
        "info unit"
        "info status";
      padding-left: clamp(1rem, -3.286rem + 18.286vw, 3rem);

      @media (min-width: 375px) {
        grid-template-columns: clamp(2rem, -2.286rem + 18.286vw, 4rem) 1fr auto;
        grid-template-areas:
          "ellipse station value"
          "ellipse station unit"
          "ellipse info unit"
          "ellipse info status";
      }

      .ellipse {
        aspect-ratio: 1;
        background-color: var(--status-good);
        border-radius: var(--border-radius-l);
        box-shadow: 0 0 var(--spacing-m) var(--status-good);
        grid-area: ellipse;
        width: clamp(var(--spacing-s), 0.214rem + 2.286vw, var(--spacing-m));
        display: none;

        @media (min-width: 375px) {
          display: block;
        }
      }

      h2 {
        grid-area: station;
        font-size: clamp(
          var(--font-size-s),
          0.464rem + 2.286vw,
          var(--font-size-m)
        );
      }

      p {
        grid-area: info;
        font-size: clamp(
          var(--font-size-xs),
          0.214rem + 2.286vw,
          var(--font-size-s)
        );
      }

      .value {
        grid-area: value;
        color: var(--status-good);
        font-weight: 600;
        font-size: clamp(
          var(--font-size-s),
          0.464rem + 2.286vw,
          var(--font-size-m)
        );
        text-align: center;
      }

      small {
        grid-area: unit;
        color: var(--text-secondary);
        font-size: var(--font-size-xs);
        text-align: center;
      }

      .status {
        grid-area: status;
        display: flex;
        justify-content: center;
        color: var(--status-good);
        border: 1px solid var(--status-good);
        padding: 0 var(--spacing-m);
        border-radius: var(--border-radius-m);
        font-size: clamp(
          var(--font-size-xs),
          0.214rem + 2.286vw,
          var(--font-size-s)
        );
      }
    }
  }
</style>
