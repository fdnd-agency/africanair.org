<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import * as maplibregl from 'maplibre-gl';
  import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
  import Legend from '$lib/components/Legend.svelte';
  import { slugify } from '$lib/slugify.js';
  import DatePicker from '$lib/components/DatePicker.svelte';

  if (browser) {
    maplibregl.setWorkerUrl(maplibreWorkerUrl);
  }

  let { data } = $props();

  let mapContainer = $state(null);
  let map = null;
  let activeMarkers = [];

  const lightStyle = '/positron.json';
  const darkStyle = '/dark_matter.json';

  const markerStatus = (value) => {
    if (!Number.isFinite(value)) return 'unknown';
    if (value < 21) return 'good';
    if (value < 42) return 'medium';
    if (value < 65) return 'high';
    return 'dangerous';
  };

  const latestMeasurement = (measurements = []) => {
    const valid = measurements
      .filter((m) => m.value !== null && m.value !== '' && Number.isFinite(Number(m.value)))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return valid.length > 0 ? valid[0] : null;
  };

  let points = $derived(
    (data.sampling_points || []).filter((point) => {
      const lng = Number(point.longitude);
      const lat = Number(point.latitude);
      return Number.isFinite(lng) && Number.isFinite(lat);
    })
  );

  function syncMarkers(ModMaplibre) {
    if (!map) return;

    // Clear existing markers
    activeMarkers.forEach((m) => m.remove());
    activeMarkers = [];

    const MarkerConstructor = ModMaplibre?.Marker || maplibregl.Marker;

    points.forEach((point) => {
      const lng = Number(point.longitude);
      const lat = Number(point.latitude);
      const m = latestMeasurement(point.measurements);
      const val = m ? Number(m.value) : null;
      const location = point.location || point.code || 'Sampling point';
      const slug = slugify(location);
      const status = markerStatus(val);
      const title = `${location}${m ? `: ${val.toFixed(1)}` : ': no measurement data'}`;

      // Create element
      const el = document.createElement('a');
      el.className = 'map-point-marker';
      el.href = `/${data.city?.slug}/detail/${slug}`;
      el.title = title;
      el.setAttribute('data-status', status);

      const marker = new MarkerConstructor({ element: el })
        .setLngLat([lng, lat])
        .addTo(map);

      activeMarkers.push(marker);
    });
  }

  function isDocumentDark() {
    if (!browser) return false;
    const root = document.documentElement;
    const computed = getComputedStyle(root);
    return (
      root.getAttribute('data-theme') === 'dark' ||
      root.classList.contains('dark') ||
      computed.colorScheme === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  onMount(async () => {
    const mod = await import('maplibre-gl');
    const ml = mod.default || mod;

    const MapConstructor = ml.Map || mod.Map;
    const NavControl = ml.NavigationControl || mod.NavigationControl;

    const cityLng = Number(data.city?.longitude);
    const cityLat = Number(data.city?.latitude);
    const defaultCenter = [
      Number.isFinite(cityLng) ? cityLng : -1.63,
      Number.isFinite(cityLat) ? cityLat : 6.68
    ];

    map = new MapConstructor({
      container: mapContainer,
      style: isDocumentDark() ? darkStyle : lightStyle,
      center: defaultCenter,
      zoom: 12,
      cooperativeGestures: true
    });

    if (NavControl) {
      map.addControl(new NavControl({ showCompass: false }), 'top-right');
    }

    map.on('load', () => {
      map.resize();
      syncMarkers(ml);
    });

    const themeObserver = new MutationObserver(() => {
      if (!map) return;
      map.setStyle(isDocumentDark() ? darkStyle : lightStyle);
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'style']
    });

    const resizeObserver = new ResizeObserver(() => {
      map?.resize();
    });
    if (mapContainer) resizeObserver.observe(mapContainer);

    return () => {
      themeObserver.disconnect();
      resizeObserver.disconnect();
      activeMarkers.forEach((m) => m.remove());
      map?.remove();
    };
  });

  // Re-sync markers if the points array updates dynamically
  $effect(() => {
    if (map && points) {
      syncMarkers(maplibregl);
    }
  });
</script>

<svelte:head>
  <title>{data.city?.name || 'City'} Air Quality Map</title>
</svelte:head>



<section class="map-section">
  <div class="presenattie">
    <DatePicker
      selectedYear={data.selectedYear}
      selectedMonth={data.selectedMonth}
      availableYears={data.availableYears}
      availableMonthsByYear={data.availableMonthsByYear}
    />
    <Legend />
  </div>

  <div bind:this={mapContainer} class="map"></div>
</section>

<style>
  .map-section {
    position: relative;
    width: 100%;
    height: 87dvh;
    margin-bottom: 4rem;
  }

  .map {
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-m, 8px);
    overflow: hidden;
  }

  div.presenattie {
    display: flex;
    justify-content: space-between;
  }

  /* Global/unscoped rule needed because MapLibre attaches elements directly to DOM */
  :global(.map-point-marker) {
    width: 1rem;
    height: 1rem;
    background-color: var(--text-secondary, #888);
    border-radius: 50%;
    text-decoration: none;
    box-shadow: 0 1px 5px var(--text-secondary, #888);
    cursor: pointer;
    transition: filter 0.15s ease;
    display: block;
  }

  :global(.map-point-marker:hover) {
    filter: brightness(1.15) drop-shadow(0 0 4px rgba(0, 0, 0, 0.3));
  }

  :global(.map-point-marker[data-status='good']) {
    background-color: var(--status-good, #22c55e);
    box-shadow: 0 1px 5px var(--status-good, #22c55e);
  }

  :global(.map-point-marker[data-status='medium']) {
    background-color: var(--status-medium, #eab308);
    box-shadow: 0 1px 5px var(--status-medium, #eab308);
  }

  :global(.map-point-marker[data-status='high']) {
    background-color: var(--status-high, #f97316);
    box-shadow: 0 1px 5px var(--status-high, #f97316);
  }

  :global(.map-point-marker[data-status='dangerous']) {
    background-color: var(--status-dangerous, #ef4444);
    box-shadow: 0 1px 5px var(--status-dangerous, #ef4444);
  }
</style>