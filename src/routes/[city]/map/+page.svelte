<script>
  import { onMount } from 'svelte';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { belongsToCity } from '$lib/directus.js';
  import { slugify } from '$lib/slugify.js';

  let { data } = $props();
  let mapContainer = $state(null);
  let map = $state(null);
  let maplibregl = $state(null);

  const lightStyle = '/positron.json';
  const darkStyle = '/dark_matter.json';

  const latestMeasurement = (measurements = []) =>
    measurements
      .filter((m) => m.value !== null && m.value !== '' && Number.isFinite(Number(m.value)))
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const markerStatus = (value) => {
    if (!Number.isFinite(value)) return 'unknown';
    if (value < 21) return 'good';
    if (value < 42) return 'medium';
    if (value < 65) return 'high';
    return 'dangerous';
  };

  let points = $derived(
    data.city.sampling_points.filter(
      (point) =>
        belongsToCity(point, data.city) &&
        Number.isFinite(Number(point.latitude)) &&
        Number.isFinite(Number(point.longitude))
    )
  );

  function registerMarker(node, params) {
    let marker = null;

    function update({ point, map, maplibregl }) {
      if (!map || !maplibregl) return;
      if (!marker) {
        marker = new maplibregl.Marker({ element: node })
          .setLngLat([Number(point.longitude), Number(point.latitude)])
          .addTo(map);
      } else {
        marker.setLngLat([Number(point.longitude), Number(point.latitude)]);
      }
    }

    update(params);

    return {
      update(newParams) {
        update(newParams);
      },
      destroy() {
        if (marker) marker.remove();
      }
    };
  }

  // Helper to determine if the document currently resolves to dark mode
  function isDocumentDark() {
    if (typeof window === 'undefined') return false;
    const rootStyle = getComputedStyle(document.documentElement);
    return rootStyle.colorScheme === 'dark' || rootStyle.getPropertyValue('color-scheme').includes('dark');
  }

  onMount(async () => {
    const maplibreModule = await import('maplibre-gl');
    maplibregl = maplibreModule.default || maplibreModule;

    const workerBlob = new Blob(
      [`import 'https://unpkg.com/maplibre-gl/dist/maplibre-gl-worker.mjs';`],
      { type: 'application/javascript' }
    );
    const workerUrl = URL.createObjectURL(workerBlob);
    maplibregl.setWorkerUrl(workerUrl);

    const city = data.city;
    let currentThemeIsDark = isDocumentDark();

    map = new maplibregl.Map({
      container: mapContainer,
      style: currentThemeIsDark ? darkStyle : lightStyle,
      center: [Number(city.longitude), Number(city.latitude)],
      zoom: 12,
      cooperativeGestures: true
    });

    map.scrollZoom.enable();
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      map.resize();
    });

    const resizeObserver = new ResizeObserver(() => {
      map?.resize();
    });

    if (mapContainer) {
      resizeObserver.observe(mapContainer);
    }

    // Function to safely switch map style
    const updateMapStyle = (toDark) => {
      if (!map) return;
      const targetStyle = toDark ? darkStyle : lightStyle;

      const applyStyle = () => {
        if (map.getStyle().sprite !== targetStyle) {
          map.setStyle(targetStyle);
        }
      };

      if (map.isStyleLoaded()) {
        applyStyle();
      } else {
        map.once('style.load', applyStyle);
      }
    };

    // Observe changes to <html> attributes (triggered by :has(:checked) or style overrides)
    const observer = new MutationObserver(() => {
      const dark = isDocumentDark();
      if (dark !== currentThemeIsDark) {
        currentThemeIsDark = dark;
        updateMapStyle(dark);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class', 'data-theme']
    });

    // Also fallback to checking document styles on user interaction (clicks)
    const handleGlobalClick = () => {
      setTimeout(() => {
        const dark = isDocumentDark();
        if (dark !== currentThemeIsDark) {
          currentThemeIsDark = dark;
          updateMapStyle(dark);
        }
      }, 0);
    };

    window.addEventListener('click', handleGlobalClick);

    return () => {
      URL.revokeObjectURL(workerUrl);
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('click', handleGlobalClick);
      if (map) map.remove();
    };
  });
</script>

<svelte:head>
  <title>{data.city.name} Air Quality Map</title>
  <meta name="description" content="Interactive air quality sampling map for {data.city.name}." />
</svelte:head>

<section class="map-section">
  <div bind:this={mapContainer} class="map"></div>

  <div class="markers-wrapper">
    {#each points as point (point.id || point.code || `${point.latitude}-${point.longitude}`)}
      {@const measurement = latestMeasurement(point.measurements)}
      {@const value = measurement ? Number(measurement.value) : null}
      {@const location = point.location || point.code || 'Sampling point'}

      <a
        href="/{data.city.slug}/detail/{slugify(location)}"
        title="{location}{measurement ? `: ${value.toFixed(1)}` : ': no measurement data'}"
        class="map-point-marker"
        data-status={markerStatus(value)}
        use:registerMarker={{ point, map, maplibregl }}
      ></a>
    {/each}
  </div>
</section>

<style>
  section.map-section {
    display: flex;
    width: 100%;
    height: 87dvh;
  }

  .map {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-m);
    overflow: hidden;
  }

  .markers-wrapper {
    display: none;
  }

  .map-point-marker {
    display: block;
    width: 1rem;
    height: 1rem;
    background-color: var(--text-secondary);
    border-radius: 50%;
    text-decoration: none;
    box-shadow: 0 1px 5px var(--text-secondary);
    transition: transform 0.15s ease;
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