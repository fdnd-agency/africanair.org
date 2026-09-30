<script>
  import info from "$lib/assets/Info.svg";
  import globe from "$lib/assets/Globe.svg";
  import handshake from "$lib/assets/Handshake.svg";
  import location from "$lib/assets/Location.svg";

  const aboutUs = [
    {
      icon: info,
      alt: "Info icon",
      title: "About this platform",
      text: `This platform presents air quality measurements from Kumasi, Ghana, with a focus on making nitrogen dioxide (NO₂) data accessible and understandable for both residents and researchers. It brings together local ground-based measurements and satellite observations to show how air pollution varies across the city and over time. The platform is designed to support awareness, research, and informed decision-making around air quality in rapidly growing urban environments.`,
    },
    {
      icon: location,
      alt: "Location icon",
      title: "Measuring air pollution at street level",
      text: `Ground-based measurements are combined with satellite observations of NO₂, providing a broader view of air pollution at city scale. Satellite data helps place local measurements in a wider spatial and temporal context, while ground measurements are essential for validating and interpreting what satellites observe over African cities. Together, these data sources provide a more complete and reliable picture of air quality in Kumasi.`,
    },
    {
      icon: globe,
      alt: "Globe icon",
      title: "Local measurements, global context",
      text: `The platform is developed through a collaboration between Kwame Nkrumah University of Science and Technology (KNUST) and the Royal Netherlands Meteorological Institute (KNMI). KNUST plays a leading role in organising measurements, operating the local laboratory, and analysing the data within Ghana. KNMI supports the project with expertise in atmospheric science, satellite data, and interpretation of the results. This collaboration strengthens local capacity while ensuring scientific robustness.`,
    },
    {
      icon: handshake,
      alt: "Handshake icon",
      title: "Collaboration and local capacity",
      text: `The platform is developed through a collaboration between Kwame Nkrumah University of Science and Technology (KNUST) and the Royal Netherlands Meteorological Institute (KNMI). KNUST plays a leading role in organising measurements, operating the local laboratory, and analysing the data within Ghana. KNMI supports the project with expertise in atmospheric science, satellite data, and interpretation of the results. This collaboration strengthens local capacity while ensuring scientific robustness.`,
    },
  ];
</script>

<main>
  <h1>About us</h1>
  <section>
    {#each aboutUs as card}
      <article>
        <img src={card.icon} alt={card.alt} />

        <h2>{card.title}</h2>

        <p>{card.text}</p>
      </article>
    {/each}
  </section>
</main>

<style>
  h1 {
    width: min(90%, 40.625rem);
    margin: 0 auto;
    padding: var(--spacing-m) var(--spacing-l);
  }

  section {
    display: grid;
    gap: var(--spacing-m);
    width: min(90%, 40.625rem);
    margin: 0 auto;
    background-color: var(--background-primary);

    article {
      display: grid;
      position: relative;
      width: 100%;
      max-width: 50rem;
      row-gap: var(--spacing-xs);
      grid-template-columns: 60px minmax(0, 1fr);
      grid-template-rows: auto 1fr;
      padding: var(--spacing-2xs);
      border-radius: var(--border-radius-m);
      background-color: var(--background-secondary);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      border: 1.5px solid var(--border-color);

      @media (min-width: 400px) {
        padding: var(--spacing-l);
      }

      img {
        grid-column: 1;
        grid-row: 1/-1;
        justify-self: center;
        width: 3rem;
        aspect-ratio: 1;
        object-fit: contain;
      }

      h2 {
        grid-column: 2;
        grid-row: 1;
        text-wrap: balance;
      }

      p {
        grid-column: 2;
        grid-row: 2;
        text-wrap: balance;
      }
    }
  }
</style>
