<script>
  import Scale from "$lib/assets/icons/Scale.svelte";
  import Map from "$lib/assets/icons/Map.svelte";
  import Graph from "$lib/assets/icons/Graph.svelte";
  import ChevronRight from "$lib/assets/icons/ChevronRight.svelte"; 

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

  <section>
    <ul>
      {#each cities as city}
        <li>
          <a href="/{city.slug}/map" class="city-link">
            <div>
              <h3>{city.name}</h3>
              <p>Africa</p>
            </div>
            <ChevronRight color="var(--text-primary)" size="2rem" />
          </a>
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

    h2, h3 {
      font-weight: 600;
    }

    section:nth-of-type(2) {
      ul {  
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xl);

        a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-s);
          background-color: var(--background-secondary);
          border: 2px solid var(--border-color);
          border-radius: var(--border-radius-m);
          color: var(--text-primary);
          transition: all 0.3s ease;

          &:hover, &:focus-visible {
            background-color: var(--primary);
            border: 2px solid var(--text-light);
            color: var(--text-light);
          }
        }
      }
    }
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
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

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