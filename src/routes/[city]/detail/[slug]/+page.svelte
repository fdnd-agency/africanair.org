<script>
  let { data } = $props();

  const measurements = $derived(
    (data.point.measurements || [])
      .filter(
        (measurement) =>
          measurement.value !== null &&
          measurement.value !== '' &&
          Number.isFinite(Number(measurement.value))
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  );

  const latestMeasurement = $derived(measurements[0]);

  const graphData = $derived([...measurements]);

  const formatDate = (date) => {
    const [year, month] = date.slice(0, 7).split('-').map(Number);
    return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(
      new Date(year, month - 1)
    );
  };

  const formatGraphDate = (dateStr) => {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('en', { month: 'short', year: '2-digit' }).format(d);
  };

  // check if the air quality  is good med or high
  const getLevelText = (value) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return '-';
    if (num < 21) return 'Good';
    if (num < 42) return 'Medium';
    if (num < 65) return 'High';
    return 'Dangerous';
  };

  // create an svg based on the data 
  const pointSpacing = 80;
  const paddingX = 20;
  const paddingY = 20;
  const height = 200;
  const maxY = 100;
  const ySpace = [20, 40, 60, 80, 100];

  const width = $derived(
    Math.max(500, paddingX * 2 + Math.max(0, graphData.length - 1) * pointSpacing)
  );

  const getX = (index) => paddingX + index * pointSpacing;
  const getY = (val) => height - paddingY - (val / maxY) * (height - paddingY * 2);

  const generateCurve = (data) => {
    if (data.length === 0) return '';
    let path = `M ${getX(0)},${getY(data[0].value)}`;
    
    for (let i = 1; i < data.length; i++) {
      const x0 = getX(i - 1);
      const y0 = getY(data[i - 1].value);
      const x1 = getX(i);
      const y1 = getY(data[i].value);
      
      const cp1x = x0 + (x1 - x0) / 2;
      const cp1y = y0;
      const cp2x = x0 + (x1 - x0) / 2;
      const cp2y = y1;
      
      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x1},${y1}`;
    }
    return path;
  };

  const linePath = $derived(generateCurve(graphData));
</script>

<svelte:head>
  <title>{data.point.location} | {data.city.name} | Africanair</title>
</svelte:head>

<section class="detail-page">
	<nav class="breadcrumb">
		<a href="/{data.city.slug}/map">{data.city.name}</a>
		<span>/</span>
		<span>{data.point.location || data.point.code}</span>
	</nav>

  {#if latestMeasurement}
    <section class="latest-reading">
      <div>
        <p class="reading-label">Measured month</p>
        <p class="reading-value">{formatDate(latestMeasurement.date)}</p>
      </div>
      <div>
        <p class="reading-label">Frequency</p>
        <p class="reading-value">Monthly</p>
      </div>
    </section>

    {#if graphData.length > 1}
      <section class="graph-section">
        <div class="y-axis-container">
          {#each ySpace as tick}
            <div class="y-label" style="top: {getY(tick)}px;">{tick}</div>
          {/each}
        </div>

        <div class="graph-scroll-container">
          <svg {width} height={height + 20} viewBox={`0 0 ${width} ${height + 20}`} class="line-graph">
            <path d={linePath} class="graph-line" />
            {#each graphData as measurement, i}
              <circle cx={getX(i)} cy={getY(measurement.value)} r="4" class="graph-point" />
              <text x={getX(i)} y={height + 15} class="axis-label x-axis" text-anchor="middle">
                {formatGraphDate(measurement.date)}
              </text>
            {/each}
          </svg>
        </div>
      </section>
    {/if}

    <section class="history">
      <div class="table-header">
        <h2>Month</h2>
        <h2>NO₂ (µg/m³)</h2>
        <h2>Level</h2>
      </div>
      <table>
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
  .detail-page {
    padding: var(--spacing-2xl) var(--spacing-m); 

		.back-link {
			display: inline-block;
			margin-bottom: var(--spacing-xl);
			color: var(--primary);
		}
  }

	.breadcrumb {
		a {
			color: var(--text-primary);
			text-decoration: underline;
		}

		span:nth-of-type(2) {
			color: var(--text-secondary);
		}
	}

  .reading-label {
    color: var(--text-secondary);
    font-size: var(--font-size-s);
    font-weight: 600;
  }

  .latest-reading {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-3xl);
    padding: var(--spacing-m) 0 var(--spacing-2xl) 0;
  }

  .reading-value {
    margin-top: var(--spacing-2xs);
    font-size: var(--font-size-m);
  }

  /* Scrollable Graph Styles */
  .graph-section {
    display: flex;
    align-items: flex-start;
    margin: var(--spacing-2xl) 0;
    width: 100%;
    position: relative;
  }

  .y-axis-container {
    position: relative;
    width: 32px;
    flex-shrink: 0;
    height: 220px; 
  }

  .y-label {
    position: absolute;
    right: 8px;
    transform: translateY(-50%);
    color: var(--text-primary);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .graph-scroll-container {
    flex-grow: 1;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: var(--spacing-s); /* Gives vertical room for the scrollbar */
    -webkit-overflow-scrolling: touch; 
    scrollbar-width: thin;
    scrollbar-color: var(--border-color) transparent;
  }

  /* Custom WebKit Scrollbar Styling (Chrome, Safari, Edge) */
  .graph-scroll-container::-webkit-scrollbar {
    height: 6px;
  }

  .graph-scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .graph-scroll-container::-webkit-scrollbar-thumb {
    background-color: var(--border-color);
    border-radius: var(--border-radius-s);
  }

  .graph-scroll-container::-webkit-scrollbar-thumb:hover {
    background-color: var(--text-secondary);
  }

  .line-graph {
    display: block;
    height: auto;
    overflow: visible;
  }

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

  /* History Table Styles */
  .history {
    margin-top: var(--spacing-2xl);
  }

  .table-header {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    padding-bottom: var(--spacing-s);
    border-bottom: 2px solid var(--border-color);
  }

  .table-header h2 {
    font-size: var(--font-size-m);
    font-weight: 600;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  tr {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    border-bottom: 1px solid var(--border-color);
  }

  td {
    padding: var(--spacing-m) 0;
    font-size: var(--font-size-s);
  }

  .empty-state {
    margin-top: var(--spacing-xl);
    color: var(--text-secondary);
  }
</style>