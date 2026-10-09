<script>
  let { data } = $props();

  // deefine the chart to display all data
  const chartHeight = 200;
  const pointSpacing = 80;
  const paddingX = 20;
  const paddingY = 20;
  const maxYValue = 100;
  const yLabels = [60, 50, 40, 30, 20, 10, 0];

  // extract and filter the data 
  const measurements = $derived(
    (data.measurements || [])
      .filter((m) => m.value !== null && m.value !== '' && Number.isFinite(Number(m.value)))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );

  const latestMeasurement = $derived(measurements[0]);

  // newest to oldest on the graph
  const graphData = $derived([...measurements]);

  // helper function for svg cooirdinats
  function getX(index) {
    return paddingX + index * pointSpacing;
  }

  function getY(value) {
    const usableHeight = chartHeight - paddingY * 2;
    const normalizedY = (Number(value) / maxYValue) * usableHeight;
    return chartHeight - paddingY - normalizedY;
  }

  // get the smooth lines for the svg
  function generateCurve(points) {
    if (points.length === 0) return '';

    let path = `M ${getX(0)},${getY(points[0].value)}`;

    for (let i = 1; i < points.length; i++) {
      const prevX = getX(i - 1);
      const prevY = getY(points[i - 1].value);
      const currentX = getX(i);
      const currentY = getY(points[i].value);

      const midX = prevX + (currentX - prevX) / 2;
      path += ` C ${midX},${prevY} ${midX},${currentY} ${currentX},${currentY}`;
    }

    return path;
  }

  // chart updates when there is a new dot / data point added
  const width = $derived(
    Math.max(500, paddingX * 2 + Math.max(0, graphData.length - 1) * pointSpacing)
  );

  const linePath = $derived(generateCurve(graphData));

  // helper function for the date
  function formatDate(dateStr) {
    const [year, month] = dateStr.slice(0, 7).split('-').map(Number);
    return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(
      new Date(year, month - 1)
    );
  }

  function formatGraphDate(dateStr) {
    return new Intl.DateTimeFormat('en', { month: 'short', year: '2-digit' }).format(
      new Date(dateStr)
    );
  }

  function getLevelText(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return '-';
    if (num < 21) return 'Good';
    if (num < 42) return 'Medium';
    if (num < 65) return 'High';
    return 'Dangerous';
  }
</script>

<svelte:head>
  <title>{data.sampling_point?.location} | {data.city.name} | Africanair</title>
</svelte:head>

<section class="detail-page">
  <nav>
    <a href="/{data.city.slug}/map">{data.city.name}</a>
    <span>/</span>
    <span>{data.sampling_point?.location || data.sampling_point?.code}</span>
  </nav>

  {#if latestMeasurement}
    <header>
      <div>
        <p>Measured month</p>
        <p>{formatDate(latestMeasurement.date)}</p>
      </div>
      <div>
        <p>Frequency</p>
        <p>Monthly</p>
      </div>
    </header>

    {#if graphData.length > 1}
      <figure>
        <figcaption>
          {#each yLabels as tick}
            <span class="y-label">{tick}</span>
          {/each}
        </figcaption>

        <div class="graph-scroll-container">
          <svg {width} height={chartHeight + 20} viewBox="0 0 {width} {chartHeight + 20}" class="line-graph">
            <path d={linePath} class="graph-line" />
            {#each graphData as measurement, i}
              <circle cx={getX(i)} cy={getY(measurement.value)} r="4" class="graph-point" />
              <text x={getX(i)} y={chartHeight + 15} class="axis-label x-axis" text-anchor="middle">
                {formatGraphDate(measurement.date)}
              </text>
            {/each}
          </svg>
        </div>
      </figure>
    {/if}

    <section class="history">
      <table class="history-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>NO₂ (µg/m³)</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {#each measurements as measurement (measurement.id)}
            <tr>
              <td>{formatDate(measurement.date)}</td>
              <td>{Number(measurement.value).toFixed(2)}</td>
              <td>{getLevelText(measurement.value)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </section>
  {:else}
    <p class="empty-state">No measurements are available for this sampling point.</p>
  {/if}
</section>

<style>
  section.detail-page {
    padding: var(--spacing-2xl) var(--spacing-m);

    nav {
      margin-bottom: var(--spacing-xl);

      a {
        color: var(--text-primary);
        text-decoration: underline;
      }

      span:nth-of-type(2) {
        color: var(--text-secondary);
      }
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-3xl);
      padding: var(--spacing-m) 0 var(--spacing-2xl) 0;

      div {
        p:nth-of-type(1) {
          color: var(--text-secondary);
          font-size: var(--font-size-s);
          font-weight: 600;
        }

        p:nth-of-type(2) {
          margin-top: var(--spacing-2xs);
          font-size: var(--font-size-m);
        }
      }
    }

    figure {
      display: flex;
      align-items: flex-start;
      margin: var(--spacing-2xl) 0;
      width: 100%;

      figcaption {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        flex-shrink: 0;
        width: 32px;
        height: 160px;
        margin-top: 20px;

        .y-label {
          color: var(--text-primary);
          font-size: var(--font-size-xs);
          font-weight: 600;
          line-height: 0;
        }
      }

      .graph-scroll-container {
        flex-grow: 1;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: var(--spacing-s);
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        scrollbar-color: var(--border-color) transparent;

        &::-webkit-scrollbar {
          height: 6px;
        }

        &::-webkit-scrollbar-track {
          background: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background-color: var(--border-color);
          border-radius: var(--border-radius-s);

          &:hover {
            background-color: var(--text-secondary);
          }
        }

        .line-graph {
          display: block;
          height: auto;
          overflow: visible;

          .graph-line {
            fill: none;
            stroke: var(--primary);
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
          }

          .graph-point {
            fill: var(--primary);
            stroke: var(--background-primary);
            stroke-width: 2;
          }

          .axis-label {
            fill: var(--text-primary);
            font-size: var(--font-size-xs);
            font-weight: 600;
          }
        }
      }
    }

    .history {
      margin-top: var(--spacing-2xl);

      .history-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;

        thead {
          border-bottom: 2px solid var(--border-color);

          th {
            padding-bottom: var(--spacing-s);
            font-size: var(--font-size-m);
            font-weight: 600;

            &:nth-child(1),
            &:nth-child(2) {
              width: 40%;
            }

            &:nth-child(3) {
              width: 20%;
            }
          }
        }

        tbody {
          tr {
            border-bottom: 1px solid var(--border-color);

            td {
              padding: var(--spacing-m) 0;
              font-size: var(--font-size-s);
            }
          }
        }
      }
    }

    .empty-state {
      margin-top: var(--spacing-xl);
      color: var(--text-secondary);
    }
  }
</style>