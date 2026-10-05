<script>
  let { data } = $props();

  const cities = data.cities;
  const samplingPoints = data.samplingPoints;
  const measurements = data.measurements;
</script>

<main>
  <!-- <ul>
    {#each cities as city}
      <li>{city.name}</li>
    {/each}
  </ul>
  <ul>
    {#each samplingPoints as samplingPoint}
      <li>{samplingPoint.location}</li>
    {/each}
  </ul>
  <ul>
    {#each measurements as measurement}
      <li>{measurement.value}</li>
    {/each}
  </ul> -->

  {#each samplingPoints as samplingPoint}
    <article>
      <span class="ellipse"></span>
      <h2>{samplingPoint.location}</h2>
      <p class="info">{samplingPoint.city.name} - September 2026</p>
      <p class="measurement">
        <span class="value">10.0</span>
        <small>µg/m³</small>
        <span class="status">Low</span>
      </p>
    </article>
  {/each}

  <article>
    <span class="ellipse"></span>
    <h2>Ahoydo roundabout</h2>
    <p class="info">Kumasi - August 2026</p>
    <p class="measurement">
      <span class="value">10.0</span>
      <small>µg/m³</small>
      <span class="status">Low</span>
    </p>
  </article>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    article {
      background-color: var(--background-secondary);
      border: 1px solid var(--border-color);
      padding: var(--spacing-m);
      border-radius: var(--border-radius-m);
      display: grid;
      align-items: center;
      grid-template-areas:
        "station ellipse"
        "info info"
        "measurement measurement";

      @media (min-width: 375px) {
        grid-template-columns:
          clamp(2rem, 0.5rem + 8vw, 3.5rem)
          1fr auto;
        padding-left: clamp(1rem, 10.667vw - 1rem, 3rem);
        grid-template-areas:
          "ellipse station measurement"
          "ellipse info measurement";
      }

      .ellipse {
        display: block;
        width: var(--spacing-s);
        aspect-ratio: 1;
        background-color: var(--status-good);
        border-radius: var(--border-radius-l);
        box-shadow: 0 0 var(--spacing-m) var(--status-good);
        grid-area: ellipse;

        @media (max-width: 375px) {
          align-self: start;
          justify-self: end;
        }

        @media (min-width: 375px) {
          width: var(--spacing-m);
        }
      }

      h2 {
        grid-area: station;
        font-size: var(--font-size-m);
      }

      .info {
        grid-area: info;
      }

      .measurement {
        grid-area: measurement;
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);

        @media (min-width: 375px) {
          flex-direction: column;
          gap: var(--spacing-2xs);
        }

        .value {
          color: var(--status-good);
          font-weight: 600;
        }

        small {
          color: var(--text-secondary);
        }

        .status {
          display: flex;
          justify-content: center;
          color: var(--status-good);
          border: 1px solid var(--status-good);
          width: 7rem;
          border-radius: var(--border-radius-m);
        }
      }
    }
  }
</style>
