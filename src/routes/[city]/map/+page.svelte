<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import * as maplibregl from 'maplibre-gl';
  import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

  if (browser) {
    maplibregl.setWorkerUrl(maplibreWorkerUrl);
  }

  import { belongsToCity } from '$lib/directus.js';
  import { slugify } from '$lib/slugify.js';

  let { data } = $props();

  let mapContainer = $state(null);
  let map = null;
  let mapReady = $state(false);
  let transformVersion = $state(0);

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
    (data.city?.sampling_points || []).filter((point) => {
      const lng = Number(point.longitude);
      const lat = Number(point.latitude);
      return belongsToCity(point, data.city) && Number.isFinite(lng) && Number.isFinite(lat);
    })
  );

  const projectedPoints = $derived.by(() => {
    void transformVersion;

    if (!map || !mapReady) return [];

    return points.map((point) => {
      const lng = Number(point.longitude);
      const lat = Number(point.latitude);
      const pos = map.project([lng, lat]);
      const m = latestMeasurement(point.measurements);
      const val = m ? Number(m.value) : null;
      const location = point.location || point.code || 'Sampling point';

      return {
        id: point.id || point.code || `${lat}-${lng}`,
        x: pos.x,
        y: pos.y,
        slug: slugify(location),
        status: markerStatus(val),
        title: `${location}${m ? `: ${val.toFixed(1)}` : ': no measurement data'}`
      };
    });
  });

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
    const maplibregl = mod.default || mod;

    const MapConstructor = maplibregl.Map || mod.Map;
    const NavControl = maplibregl.NavigationControl || mod.NavigationControl;

    const cityLng = Number(data.city?.longitude);
    const cityLat = Number(data.city?.latitude);
    const defaultCenter = [
      Number.isFinite(cityLng) ? cityLng : 0,
      Number.isFinite(cityLat) ? cityLat : 0
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

    const updateCoords = () => {
      transformVersion += 1;
    };

    map.on('move', updateCoords);
    map.on('zoom', updateCoords);
    map.on('resize', updateCoords);

    map.on('load', () => {
      mapReady = true;
      map.resize();
      updateCoords();
    });

    const resizeObserver = new ResizeObserver(() => {
      map?.resize();
      updateCoords();
    });
    if (mapContainer) resizeObserver.observe(mapContainer);

    return () => {
      resizeObserver.disconnect();
      if (map) {
        map.off('move', updateCoords);
        map.off('zoom', updateCoords);
        map.off('resize', updateCoords);
        map.remove();
      }
    };
  });
</script>

<svelte:head>
  <title>{data.city.name} Air Quality Map</title>
</svelte:head>

<section class="map-section">
  <div bind:this={mapContainer} class="map"></div>

  <div class="markers-overlay">
    {#each projectedPoints as p (p.id)}
      <a
        href="/{data.city.slug}/detail/{p.slug}"
        title={p.title}
        class="map-point-marker"
        data-status={p.status}
        style="transform: translate3d({p.x}px, {p.y}px, 0);"
      ></a>
    {/each}
  </div>
</section>

<style>
  .map-section {
    position: relative;
    width: 100%;
    height: 87dvh;
    overflow: hidden;
  }

  .map {
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-m, 8px);
    overflow: hidden;
  }
  .markers-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .map-point-marker {
    position: absolute;
    top: 0;
    left: 0;
    width: 1rem;
    height: 1rem;
    margin-top: -0.5rem;
    margin-left: -0.5rem;
    background-color: var(--text-secondary);
    border-radius: 50%;
    text-decoration: none;
    box-shadow: 0 1px 5px var(--text-secondary);
    pointer-events: auto;
    cursor: pointer;
    will-change: transform;
    transition: filter 0.15s ease;
  }

  .map-point-marker:hover {
    filter: brightness(1.15) drop-shadow(0 0 4px rgba(0, 0, 0, 0.3));
  }

  .map-point-marker[data-status='good'] {
    background-color: var(--status-good);
    box-shadow: 0 1px 5px var(--status-good);
  }

  .map-point-marker[data-status='medium'] {
    background-color: var(--status-medium);
    box-shadow: 0 1px 5px var(--status-medium);
  }

  .map-point-marker[data-status='high'] {
    background-color: var(--status-high);
    box-shadow: 0 1px 5px var(--status-high);
  }

  .map-point-marker[data-status='dangerous'] {
    background-color: var(--status-dangerous);
    box-shadow: 0 1px 5px var(--status-dangerous);
  }

  .map-point-marker:focus-visible {
    outline: 3px solid var(--text-primary);
    outline-offset: 2px;
  }
</style>