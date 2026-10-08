<script>
  let { data } = $props();

  const { measurements } = data;

  const dateRefactor = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const standardEU = [20, 40, 80];

  const statusChecker = (value) => {
    if (value < standardEU[0]) {
      return "low";
    } else if (value < standardEU[1]) {
      return "medium";
    } else if (value < standardEU[2]) {
      return "high";
    } else if (value >= standardEU[2]) {
      return "dangerous";
    }
  };
</script>

<main>
  {#each measurements as measurement}
    {@const roundedValue = Number(measurement.value ?? 0).toFixed(1)}
    {@const status = statusChecker(measurement.value)}
    <article class="{status}">
      <span class="ellipse {status}"></span>
      <h2>{measurement.sampling_point.location}</h2>
      <p>
        {measurement.sampling_point.city.name} - {dateRefactor(
          measurement.sampling_point.date_updated,
        )}
      </p>
      <span class="value {status}">{roundedValue}</span>
      <small>µg/m³</small>
      <span class="status {status}">{status}</span>
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
      border: 1px solid var(--border-color);
      /* box-shadow: 2px 2px 2px var(--border-color); */
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

      &.low {
          background-color: var(--status-good-background);
        }

        &.medium {
          background-color: var(--status-medium-background);
        }

        &.high {
          background-color: var(--status-high-background);
        }

        &.dangerous {
          background-color: var(--status-dangerous-background);
        }

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
        border-radius: var(--border-radius-l);
        box-shadow: 0 0 var(--spacing-xl) var(--status-good);
        grid-area: ellipse;
        width: clamp(var(--spacing-s), 0.214rem + 2.286vw, var(--spacing-m));
        display: none;

        &.low {
          background-color: var(--status-good);
          box-shadow: 0 0 var(--spacing-xl) var(--status-good);
        }

        &.medium {
          background-color: var(--status-medium);
          box-shadow: 0 0 var(--spacing-xl) var(--status-medium);
        }

        &.high {
          background-color: var(--status-high);
          box-shadow: 0 0 var(--spacing-xl) var(--status-high);
        }

        &.dangerous {
          background-color: var(--status-dangerous);
          box-shadow: 0 0 var(--spacing-xl) var(--status-dangerous);
        }

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
        font-weight: 600;
        font-size: clamp(
          var(--font-size-s),
          0.464rem + 2.286vw,
          var(--font-size-m)
        );
        text-align: center;

        &.low {
          color: var(--status-good);
        }

        &.medium {
          color: var(--status-medium);
        }

        &.high {
          color: var(--status-high);
        }

        &.dangerous {
          color: var(--status-dangerous);
        }
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
        width: 5rem;
        text-transform: capitalize;
        border-radius: var(--border-radius-m);
        font-size: clamp(
          var(--font-size-xs),
          0.214rem + 2.286vw,
          var(--font-size-s)
        );

        &.low {
          color: var(--status-good);
          border: 1px solid var(--status-good);
        }

        &.medium {
          color: var(--status-medium);
          border: 1px solid var(--status-medium);
        }

        &.high {
          color: var(--status-high);
          border: 1px solid var(--status-high);
        }

        &.dangerous {
          color: var(--status-dangerous);
          border: 1px solid var(--status-dangerous);
        }
      }
    }
  }
</style>
