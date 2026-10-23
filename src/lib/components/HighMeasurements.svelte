<script>
  import { statusChecker } from '$lib/relatives.js';

  let { measurements = [] } = $props();
  
  let hazardousCount = $derived(
    measurements.filter((p) => {
      const val = p.latestMeasurement ? Number(p.latestMeasurement.value) : null;
      return statusChecker(val) === 'dangerous';
    }).length
  );

  let elevatedCount = $derived(
    measurements.filter((p) => {
      const val = p.latestMeasurement ? Number(p.latestMeasurement.value) : null;
      const status = statusChecker(val);
      return status === 'high' || status === 'medium';
    }).length
  );
</script>

<section>
  <p>
    <em>{hazardousCount}</em> stations are currently measuring hazardous air quality, with <em>{elevatedCount} elevated</em>
  </p>
</section>

<style> 
  section {
    display: flex;
    padding: 1rem;
    background-color: var(--alert-background);
    border-radius: var(--border-radius-m);
    margin-block: 1rem;
    border-left: 2px solid red;

    em {
      font-style: normal;
      font-weight: 700;
      color: var(--alert-text);
    }
  }
</style>