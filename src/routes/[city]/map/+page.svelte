<script>
  import { onMount } from 'svelte';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

  let mapContainer;
  let map;

  const lightStyle = 'https://tiles.openfreemap.org/styles/positron';
  const darkStyle = 'https://tiles.openfreemap.org/styles/fiord';

  onMount(async () => {
    const maplibreglModule = await import('maplibre-gl');
    const maplibregl = maplibreglModule.default || maplibreglModule;
    maplibregl.setWorkerUrl(maplibreWorkerUrl);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    map = new maplibregl.Map({
      container: mapContainer,
      style: mediaQuery.matches ? darkStyle : lightStyle,
      center: [-1.6244, 6.6884], // Kumasi
      zoom: 12
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

<div class="map-wrap">
  <div bind:this={mapContainer} class="map"></div>
</div>

<style>
  .map-wrap {
    position: relative;
    width: 100%;
    height: 100vh;
  }

  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
</style>