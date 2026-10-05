<script>
  import { onMount } from 'svelte';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { belongsToCity } from '$lib/directus.js';
  import { slugify } from '$lib/slugify.js';

  let { data } = $props();
  let mapContainer = $state(null);
  let map = $state(null);
  let maplibregl = $state(null);
  let markers = [];

  const lightStyle = '/positron.json';
  const darkStyle = '/dark_matter.json';

  const latestMeasurement = (measurements = []) =>
    measurements
      .filter((m) => m.value !== null && m.value !== '' && Number.isFinite(Number(m.value)))
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const markerColor = (value) => {
    if (!Number.isFinite(value)) return 'var(--text-secondary)';
    if (value < 21) return 'var(--status-good)';
    if (value < 42) return 'var(--status-medium)';
    if (value < 65) return 'var(--status-high)';
    return 'var(--status-dangerous)';
  };

  let points = $derived(
    data.city.sampling_points.filter(
      (point) =>
        belongsToCity(point, data.city) &&
        Number.isFinite(Number(point.latitude)) &&
        Number.isFinite(Number(point.longitude))
    )
  );

  onMount(async () => {
    // Dynamic import defers loading until the page is interactive
    const maplibreModule = await import('maplibre-gl');
    maplibregl = maplibreModule.default || maplibreModule;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const city = data.city;

    map = new maplibregl.Map({
      container: mapContainer,
      style: mediaQuery.matches ? darkStyle : lightStyle,
      center: [Number(city.longitude), Number(city.latitude)],
      zoom: 12,
      cooperativeGestures: true
    });

    map.scrollZoom.enable();
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    const resizeObserver = new ResizeObserver(() => {
      map?.resize();
    });

    if (mapContainer) {
      resizeObserver.observe(mapContainer);
    }

    const handleThemeChange = (event) => {
      if (map) map.setStyle(event.matches ? darkStyle : lightStyle);
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      resizeObserver.disconnect();
      mediaQuery.removeEventListener('change', handleThemeChange);
      if (map) map.remove();
    };
  });

  $effect(() => {
    if (!map || !maplibregl) return;

    markers.forEach((m) => m.remove());
    markers = [];

    points.forEach((point) => {
      const measurement = latestMeasurement(point.measurements);
      const value = measurement ? Number(measurement.value) : null;
      const markerLink = document.createElement('a');
      const location = point.location || point.code || 'Sampling point';

      markerLink.className = 'map-point-marker';
      markerLink.href = `/${data.city.slug}/detail/${slugify(location)}`;
      markerLink.title = `${location}${measurement ? `: ${value.toFixed(1)}` : ': no measurement data'}`;
      markerLink.style.setProperty('--marker-color', markerColor(value));

      const marker = new maplibregl.Marker({ element: markerLink })
        .setLngLat([Number(point.longitude), Number(point.latitude)])
        .addTo(map);

      markers.push(marker);
    });
  });
</script>

<svelte:head>
  <title>{data.city.name} Air Quality Map</title>
  <meta name="description" content="Interactive air quality sampling map for {data.city.name}." />
</svelte:head>

<section class="map-section">
  <div bind:this={mapContainer} class="map"></div>
</section>

<style>
  section.map-section {
    display: flex;
    width: 92%;
    height: 87dvh;
    margin: 0 auto;
  }

  .map {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-m);
    overflow: hidden;
  }

  :global(.map-point-marker) {
    width: 1.5rem; /* Expanded touch target size for accessibility */
    height: 1.5rem;
    background-color: var(--marker-color);
    padding: 0;
    border-radius: 50%;
    text-decoration: none;
    box-shadow: 0 1px 5px var(--marker-color);
    transition: transform 0.15s ease;
  }

  :global(.map-point-marker:hover),
  :global(.map-point-marker:focus-visible) {
    transform: scale(1.15);
  }

  :global(.map-point-marker:focus-visible) {
    outline: 3px solid var(--text-primary);
    outline-offset: 2px;
  }
</style>