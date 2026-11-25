<script>
  import { statusChecker, selectedStandard } from '$lib/relatives.js';

  let { sampling_points = [] } = $props();
  
  function getLatestValue(point) {
    const measurements = point.measurements || [];
    const latest = measurements[measurements.length - 1];
    return latest && latest.value !== null ? Number(latest.value) : null;
  }

  let hazardousCount = $derived.by(() => {
    const _currentStandard = $selectedStandard; 

    return sampling_points.filter((p) => {
      const value = getLatestValue(p);
      const status = statusChecker(value);
      return status === 'dangerous' || status === 'hazardous';
    }).length;
  });
</script>

<section>
  <p>
    <em>{hazardousCount}</em> station(s) are measuring hazardous air quality this month.
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