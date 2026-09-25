<script>
  import info from "$lib/assets/Info.svg"
  import globe from "$lib/assets/Globe.svg"
  import handshake from "$lib/assets/Handshake.svg"
  import location from "$lib/assets/Location.svg"

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
  ]
</script>

<h1>About us</h1>
<section>
  {#each aboutUs as card}
    <article>
      <div class="logo-icon">
        <img src={card.icon} alt={card.alt} />
      </div>

      <div class="card-content">
        <h2>{card.title}</h2>
        <p>{card.text}</p>
      </div>
    </article>
  {/each}
</section>

<style>
  h1 {
    width: min(90%, 40.625rem);
    margin: 0 auto;
    padding: 1rem 1.25rem;
  }

  section {
    display: grid;
    gap: 1rem;
    width: min(90%, 40.625rem);
    margin-right: auto;
    margin-left: auto;
    background-color: var(--background-primary);

    article {
        display: grid;
        width: 100%;
        max-width: 50rem;
        grid-template-columns: 60px minmax(0, 1fr);
        padding: 1.25rem;
        border-radius: 1rem;
        background-color: var(--background-primary);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

        .card-content {
            margin-inline-start: 1rem;

            h2 {
              text-wrap: balance;
            }

            p {
                margin-block-start: 1rem;
                font-weight: 400;
                text-wrap: balance;
            }
        }
    }
  }
</style>
