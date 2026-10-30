<script>
  let { point } = $props();

  const dateRefactor = (date) => {
    if (date === null || date === undefined) {
      return "No recent data";
    } else {
      return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }
  };

  const valueRefactor = (value) => {
    if (value === null || value === undefined) {
      return "N/A";
    }
    return Number(value).toFixed(1);
  };

  const standardEU = [20, 40, 80];

  const statusChecker = (value) => {
    if (value === null || value === undefined) {
      return "empty";
    }
    if (value < standardEU[0]) {
      return "low";
    } else if (value < standardEU[1]) {
      return "medium";
    } else if (value < standardEU[2]) {
      return "high";
    } else if (value >= standardEU[2]) {
      return "hazardous";
    }
    return "empty";
  };
  const roundedValue = $derived(valueRefactor(point.measurements[0]?.value));
  const status = $derived(statusChecker(point.measurements[0]?.value));
</script>

<article class={status}>
  <span class="ellipse {status}"></span>
  <h2>{point.location}</h2>
  <p>
    {point.city_id.name} - {dateRefactor(point.measurements[0]?.date)}
  </p>
  <span class="value {status}">{roundedValue}</span>
  <small>µg/m³</small>
  <span class="status {status}">{status}</span>
</article>

<style>
  article {
    border: 1px solid var(--border-color);
    padding: var(--spacing-m);
    border-radius: var(--border-radius-m);
    background-color: var(--background-secondary);
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "station value"
      "station unit"
      "info unit"
      "info status";
    padding-left: clamp(var(--spacing-m), -3.286rem + 18.286vw, 3rem);

    &.low {
      background-color: var(--status-good-background);
    }

    &.medium {
      background-color: var(--status-medium-background);
    }

    &.high {
      background-color: var(--status-high-background);
    }

    &.hazardous {
      background-color: var(--status-hazardous-background);
    }

    &.empty {
      background-color: var(--status-empty-background);
    }

    @media (min-width: 375px) {
      grid-template-columns:
        clamp(var(--spacing-2xl), -2.286rem + 18.286vw, 4rem)
        1fr auto;
      grid-template-areas:
        "ellipse station value"
        "ellipse station unit"
        "ellipse info unit"
        "ellipse info status";
    }

    .ellipse {
      aspect-ratio: 1;
      border-radius: var(--border-radius-l);
      box-shadow: 0 0 var(--spacing-xl) var(--status-empty);
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

      &.hazardous {
        background-color: var(--status-hazardous);
        box-shadow: 0 0 var(--spacing-xl) var(--status-hazardous);
      }

      &.empty {
        background-color: var(--status-empty);
        box-shadow: 0 0 var(--spacing-xl) var(--status-empty);
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
    }

    small {
      grid-area: unit;
      color: var(--text-secondary);
      font-size: var(--font-size-xs);
      text-align: center;
    }

    .status {
      --status-text-color: light-dark(hsl(0 0% 5%), hsl(215 50% 12%));
      grid-area: status;
      display: flex;
      justify-content: center;
      width: 5rem;
      text-transform: capitalize;
      font-weight: 500;
      border-radius: var(--border-radius-m);
      color: var(--status-text-color);
      font-size: clamp(
        var(--font-size-xs),
        0.214rem + 2.286vw,
        var(--font-size-s)
      );

      &.low {
        background-color: var(--status-good);
        border: 1px solid var(--status-good);
      }

      &.medium {
        background-color: var(--status-medium);
        border: 1px solid var(--status-medium);
      }

      &.high {
        background-color: var(--status-high);
        border: 1px solid var(--status-high);
      }

      &.hazardous {
        background-color: var(--status-hazardous);
        border: 1px solid var(--status-hazardous);
      }

      &.empty {
        background-color: var(--status-empty);
        border: 1px solid var(--status-empty);
      }
    }
  }
</style>
