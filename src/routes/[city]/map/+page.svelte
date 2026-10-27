<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import "maplibre-gl/dist/maplibre-gl.css";
  import Viewtoggle from "$lib/components/molecules/Viewtoggle.svelte";
  import * as maplibregl from "maplibre-gl";
  import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
  import { slugify } from "$lib/slugify.js";
  import DatePicker from "$lib/components/molecules/DatePicker.svelte";
  import Legend from "$lib/components/molecules/Legend.svelte";
  import Relatives from "$lib/components/molecules/Relatives.svelte";
  import { selectedStandard, statusChecker } from "$lib/relatives.js";

  if (browser) {
    maplibregl.setWorkerUrl(maplibreWorkerUrl);
  }

  let { data } = $props();

  let samplingPoints = $derived(data.sampling_points || []);
  let selectedYear = $derived(data.selectedYear);
  let selectedMonth = $derived(data.selectedMonth);

  let mapContainer = $state(null);
  let map = $state(null);
  let activeMarkers = [];

  const lightStyle = "/positron.json";
  const darkStyle = "/dark_matter.json";

  const latestMeasurement = (measurements = []) => {
    const valid = measurements
      .filter(
        (m) =>
          m.value !== null &&
          m.value !== "" &&
          Number.isFinite(Number(m.value)),
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return valid.length > 0 ? valid[0] : null;
  };

  let points = $derived(
    (samplingPoints || []).filter((point) => {
      const lng = Number(point.longitude);
      const lat = Number(point.latitude);
      return Number.isFinite(lng) && Number.isFinite(lat);
    }),
  );

  // Derived list pairing each valid point with its latest measurement
  let pointsWithLatest = $derived(
    points.map((point) => ({
      ...point,
      latestMeasurement: latestMeasurement(point.measurements)
    }))
  );

  function syncMarkers(ModMaplibre) {
    if (!map) return;

    activeMarkers.forEach((m) => m.remove());
    activeMarkers = [];

    const MarkerConstructor = ModMaplibre?.Marker || maplibregl.Marker;

    points.forEach((point) => {
      const lng = Number(point.longitude);
      const lat = Number(point.latitude);
      const m = latestMeasurement(point.measurements);
      const val = m ? Number(m.value) : null;
      const location = point.location || point.code || "Sampling point";
      const slug = slugify(location);

      const status = statusChecker(val);
      const title = `${location}${m ? `: ${val.toFixed(1)}` : ": no measurement data"}`;

      const el = document.createElement("a");
      el.className = "map-point-marker";
      el.href = `/${data.city?.slug}/detail/${slug}`;
      el.title = title;
      el.setAttribute("data-status", status);

      const marker = new MarkerConstructor({ element: el })
        .setLngLat([lng, lat])
        .addTo(map);

      activeMarkers.push(marker);
    });
  }

  onMount(async () => {
    const mod = await import("maplibre-gl");
    const ml = mod.default || mod;

    const MapConstructor = ml.Map || mod.Map;
    const NavControl = ml.NavigationControl || mod.NavigationControl;

    const cityLng = Number(data.city?.longitude);
    const cityLat = Number(data.city?.latitude);
    const defaultCenter = [
      Number.isFinite(cityLng) ? cityLng : -1.63,
      Number.isFinite(cityLat) ? cityLat : 6.68,
    ];

    map = new MapConstructor({
      container: mapContainer,
      style: document.documentElement.classList.contains("dark")
        ? darkStyle
        : lightStyle,
      center: defaultCenter,
      zoom: 11.5,
      cooperativeGestures: true,
    });

    if (NavControl) {
      map.addControl(new NavControl({ showCompass: false }), "top-right");
    }

    map.on("load", () => {
      map.resize();
      syncMarkers(ml);
    });
  });

  $effect(() => {
    const current = points;

    const currentStandard = $selectedStandard;

    if (map && current && currentStandard) {
      syncMarkers(maplibregl);
    }
  });
</script>

<svelte:head>
  <title>{data.city?.name || "City"} Air Quality Map</title>
</svelte:head>

<main>
  <header class="map-header">
    <div>
      <h1>{data.city?.name}</h1>
      <p>Ghana, West Africa</p>
    </div>
    <DatePicker
      {selectedYear}
      {selectedMonth}
      availableYears={data.availableYears}
      availableMonthsByYear={data.availableMonthsByYear}
    />
  </header>

  <Viewtoggle />
  <section>
    <div bind:this={mapContainer} class="map"></div>
    <div class="desktop-styles">
      <Relatives />
      <Legend />
    </div>
    <noscript>
      <ul>
        {#each points as point}
          {@const m = latestMeasurement(point.measurements)}
          <li>
            <a
              href="/{data.city.slug}/detail/{slugify(
                point.location || point.code,
              )}"
            >
              {point.location || point.code}: {m
                ? Number(m.value).toFixed(1)
                : "no measurement data"}
            </a>
          </li>
        {/each}
      </ul>
    </noscript>
  </section>
</main>

<style>
  main {
    position: relative;
    width: 100%;
    overflow: hidden;

    header.map-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-inline: var(--spacing-m);

      p {
        color: var(--text-secondary);
      }
    }

    section {
      padding-inline: var(--spacing-m);
      padding-top: var(--spacing-m);

      div.map {
        width: 100%;
        height: 57dvh;
        border-radius: var(--border-radius-m, 8px);
        overflow: hidden;
      }
    }
  }

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

  :global(.map-point-marker[data-status="good"]) {
    background-color: var(--status-good, #22c55e);
    box-shadow: 0 1px 5px var(--status-good, #22c55e);
  }

  :global(.map-point-marker[data-status="medium"]) {
    background-color: var(--status-medium, #eab308);
    box-shadow: 0 1px 5px var(--status-medium, #eab308);
  }

  :global(.map-point-marker[data-status="high"]) {
    background-color: var(--status-high, #f97316);
    box-shadow: 0 1px 5px var(--status-high, #f97316);
  }

  :global(.map-point-marker[data-status="dangerous"]) {
    background-color: var(--status-dangerous, #ef4444);
    box-shadow: 0 1px 5px var(--status-dangerous, #ef4444);
  }

  div.desktop-styles {
    @media (min-width: 798px) {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
    }
  }
</style>
