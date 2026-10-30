<script>
  import { statusChecker, selectedStandard } from '$lib/relatives.js';

  let { sampling_points = [], previous_sampling_points = [] } = $props();
  
  function getLatestValue(point) {
    const measurements = point.measurements || [];
    const latest = measurements[measurements.length - 1];
    return latest && latest.value !== null ? Number(latest.value) : null;
  }

  let hazardousCount = $derived(
    ($selectedStandard, sampling_points.filter((p) => {
      return statusChecker(getLatestValue(p)) === 'hazardous';
    }).length)
  );

  let elevatedCount = $derived(
    ($selectedStandard, sampling_points.filter((p) => {
      const status = statusChecker(getLatestValue(p));
      return status === 'high' || status === 'medium';
    }).length)
  );
  
</script>

<section>
  <p>
    <em>{hazardousCount}</em> station(s) are currently measuring hazardous air quality, with <em>{elevatedCount} elevated</em>.
  </p>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: var(--alert-background);
    border-radius: var(--border-radius-m);
    margin-block: 1rem;
    border-left: 2px solid red;
    color: var(--text-light);

    em {
      font-style: normal;
      font-weight: 700;
      color: var(--alert-text);
    }
  }
</style>