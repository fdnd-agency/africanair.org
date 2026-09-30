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
    
    const linkElement = document.createElement('a');
    linkElement.className = 'map-link-marker';
    linkElement.href = 'https://en.wikipedia.org/wiki/Kumasi';
    linkElement.target = '_blank';
    linkElement.textContent = 'Visit Kumasi';

    new maplibregl.Marker({ element: linkElement })
      .setLngLat([-1.6244, 6.6884])
      .addTo(map);
    // ---------------------------------------------

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

  /* Target the dynamically created <a> tag with :global */
  :global(.map-link-marker) {
    display: block;
    background-color: #0070f3;
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    text-decoration: none;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    transition: transform 0.2s, background-color 0.2s;
  }

  :global(.map-link-marker:hover) {
    background-color: #005bb5;
    transform: scale(1.05);
  }
</style>