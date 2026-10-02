<script>
  import { onMount } from 'svelte';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
  import { belongsToCity } from '$lib/directus.js';
  import { slugify } from '$lib/slugify.js';

  let { data } = $props();
  let mapContainer;
  let map;

  const lightStyle = 'https://tiles.openfreemap.org/styles/positron';
  const darkStyle = 'https://tiles.openfreemap.org/styles/fiord';

  const latestMeasurement = (measurements = []) =>
    measurements
      .filter(
        (measurement) =>
          measurement.value !== null &&
          measurement.value !== '' &&
          Number.isFinite(Number(measurement.value))
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const markerColor = (value) => {
    if (!Number.isFinite(value)) return 'var(--text-secondary)';
    if (value < 20) return 'var(--status-good)';
    if (value < 40) return 'var(--status-medium)';
    if (value < 60) return 'var(--status-high)';
    return 'var(--status-dangerous)';
  };

  onMount(async () => {
    const maplibreglModule = await import('maplibre-gl');
    const maplibregl = maplibreglModule.default || maplibreglModule;
    maplibregl.setWorkerUrl(maplibreWorkerUrl);

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

    const points = city.sampling_points.filter((point) => {
      return (
        belongsToCity(point, city) &&
        Number.isFinite(Number(point.latitude)) &&
        Number.isFinite(Number(point.longitude))
      );
    });

    points.forEach((point) => {
      const measurement = latestMeasurement(point.measurements);
      const value = measurement ? Number(measurement.value) : null;
      const markerLink = document.createElement('a');
      const location = point.location || point.code || 'Sampling point';

      markerLink.className = 'map-point-marker';
      markerLink.href = `/${city.slug}/detail/${slugify(location)}`;
      markerLink.title = `${location}${measurement ? `: ${value.toFixed(1)}` : ': no measurement data'}`;
      markerLink.style.setProperty('--marker-color', markerColor(value));

      new maplibregl.Marker({ element: markerLink })
        .setLngLat([Number(point.longitude), Number(point.latitude)])
        .addTo(map);
    });

    const handleThemeChange = (event) => {
      if (map) {
        map.setStyle(event.matches ? darkStyle : lightStyle);
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      if (map) map.remove();
    };
  });
</script>

<section class="map">
  <div bind:this={mapContainer} class="map"></div>
</section>

<style>
  section.map {
    position: sticky;
    top: 0;
    width: 95%;
    height: 90dvh;
    margin: 0 auto;
    
  }

  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-m);
  }

  :global(.map-point-marker) {
    display: block;
    width: 18px;
    height: 18px;
    background-color: var(--marker-color);
    padding: 0;
    border: 2px solid var(--background-primary);
    border-radius: 50%;
    text-decoration: none;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
    transition: transform 0.15s ease;
  }

  :global(.map-point-marker:hover),
  :global(.map-point-marker:focus-visible) {
    transform: scale(1.12);
  }

  :global(.map-point-marker:focus-visible) {
    outline: 3px solid var(--text-primary);
    outline-offset: 2px;
  }
</style>