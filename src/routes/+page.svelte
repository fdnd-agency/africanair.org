<script>
  import Scale from "$lib/assets/icons/Scale.svelte";
  import Map from "$lib/assets/icons/Map.svelte";
  import Graph from "$lib/assets/icons/Graph.svelte";

  let { data } = $props();
  let cities = data.cities;
</script>

<main>
  <section>
    <article>
      <h2>What does this site show?</h2>
      <p>This platform helps residents, researchers, and policymakers understand air quality through reliable street-level measurements and clear insights.</p>
    </article>

    <article>
      <h2>How to use it</h2>
      <div>
        <ul class="icons">
          <li><Map color="#ffffff" size="1.9rem" /></li>
          <li><Scale color="#ffffff" size="2.5rem" /></li>
          <li><Graph color="#ffffff" size="1.7rem" /></li>  
        </ul>
        <ul class="texts">
          <li>
            <h3>Explore the map</h3>
            <p>See air quality across the cities.</p>
          </li>
          <li>
            <h3>Compare locations</h3>
            <p>Find cleaner and more polluted areas.</p>
          </li>
          <li>
            <h3>Read the air quality index</h3>
            <p>Understand levels and take action.</p>
          </li>
        </ul>
      </div>
    </article>
  </section>

  <h2>Select the city you want info from</h2>

  <section class="city-section">
    <ul class="city-list">
      {#each cities as city}
        <li>
          <div class="city-info">
            <h3>{city.name}</h3>
            <!-- Fallback or dynamic formatting for date -->
            <time datetime={city.date_created}>
              {city.date_created ? city.date_created.substring(0, 10) : ''}
            </time>
          </div>
          <a href="/{city.slug}/map" class="city-link">></a>  
        </li>
      {/each}
    </ul>
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l, 2rem);
    margin: 0 auto;
    padding: var(--spacing-xl, 3rem);
    max-width: 800px;
  }

  ul {
    list-style: none;
  }

  article {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-l, 1.5rem);
    background-color: var(--background-secondary, #f9f9f9);
    border-radius: var(--border-radius-m, 8px);
    border: 2px solid var(--border-color, #e0e0e0);

    &:nth-of-type(2) {
      gap: var(--spacing-2xl, 3rem);
      margin-top: var(--spacing-2xl, 3rem);
      div {
        display: flex;
        gap: var(--spacing-l, 1.5rem);
      }

      ul {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--spacing-l, 1.5rem);
      }
      
      ul.icons {
        background: linear-gradient(var(--primary, #0070f3), var(--primary, #0070f3)) center / 3px 100% no-repeat;

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--primary, #0070f3);
          width: 3rem;
          height: 3rem;
          border-radius: var(--border-radius-l, 12px);
        }
      }
    }
  }
</style>