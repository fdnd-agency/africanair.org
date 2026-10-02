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

	const formatDate = (date) => {
		const [year, month] = date.slice(0, 7).split('-').map(Number);
		return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(
			new Date(year, month - 1)
		);
	};
</script>

<svelte:head>
	<title>{data.point.location} | {data.city.name} | Africanair</title>
</svelte:head>

<main class="detail-page">
	<a class="back-link" href={`/${data.city.slug}/map`}>Back to {data.city.name} map</a>

	<header class="detail-header">
		<p>{data.city.name}{data.point.code ? ` / ${data.point.code}` : ''}</p>
		<h1>{data.point.location || data.point.code}</h1>
	</header>

	{#if latestMeasurement}
		<section class="latest-reading">
			<div>
				<p class="reading-label">Latest measurement</p>
				<p class="reading-date">{formatDate(latestMeasurement.date)}</p>
			</div>
			<p class="reading-value">{Number(latestMeasurement.value).toFixed(1)}</p>
		</section>

		<section class="history">
			<h2>Measurement history</h2>
			<table>
				<thead>
					<tr><th>Month</th><th>Value</th></tr>
				</thead>
				<tbody>
					{#each measurements as measurement (measurement.id)}
						<tr>
							<td>{formatDate(measurement.date)}</td>
							<td>{Number(measurement.value).toFixed(1)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</section>
	{:else}
		<p class="empty-state">No measurements are available for this sampling point.</p>
	{/if}
</main>

<style>
	.detail-page {
		width: min(100% - 2 * var(--spacing-m), 48rem);
		max-width: none;
		margin: var(--spacing-2xl) auto;
	}

	.back-link {
		display: inline-block;
		margin-bottom: var(--spacing-2xl);
		color: var(--primary);
	}

	.detail-header {
		padding-bottom: var(--spacing-xl);
		border-bottom: 1px solid var(--border-color);
	}

	.detail-header p,
	.reading-label {
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
	}

	.detail-header h1 {
		margin-top: var(--spacing-xs);
		font-size: var(--font-size-xl);
	}

	.latest-reading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-m);
		padding: var(--spacing-xl) 0;
		border-bottom: 1px solid var(--border-color);
	}

	.reading-date {
		margin-top: var(--spacing-2xs);
	}

	.reading-value {
		font-size: var(--font-size-xl);
		font-weight: 600;
	}

	.history {
		margin-top: var(--spacing-2xl);
	}

	.history h2 {
		margin-bottom: var(--spacing-s);
		font-size: var(--font-size-m);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
	}

	th,
	td {
		padding: var(--spacing-s);
		border-bottom: 1px solid var(--border-color);
	}

	th {
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		font-weight: 500;
	}

	.empty-state {
		margin-top: var(--spacing-xl);
		color: var(--text-secondary);
	}
</style>