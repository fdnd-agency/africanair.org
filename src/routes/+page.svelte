<script>
  import Scale from "$lib/assets/icons/Scale.svelte"
  import Map from "$lib/assets/icons/Map.svelte"
  import Graph from "$lib/assets/icons/Graph.svelte"

  let city = $props();
</script>

<main>
  <section>
    <article>
      <h2>What does this site show?</h2>
      <p>This platform helps residents, researchers, and policymakers understand air quality in Kumasi through reliable street-level measurements and clear insights.</p>
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
            <p>See air quality across Kumasi.</p>
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
      {#each city as city}
        <li>
          <h3>{city.name}</h3>
          <h4>{city.country}</h4>
          <time datetime="2026-06-22">2026-06-22</time>
          <a href="/{city.name}/map">></a>  
        </li>
      {/each}
    </ul>
  </section>

</main>

<style>

  main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);
    margin: 0 auto;
    padding: var(--spacing-xl)
  }
  article {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-l);
    background-color: var(--background-secondary);
    border-radius: var(--border-radius-m);
    border: 2px solid var(--border-color);

    &:nth-of-type(2) {
      gap: var(--spacing-2xl);
      margin-top: var(--spacing-2xl);
      div {
        display: flex;
        gap: var(--spacing-l)
      }

      ul {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--spacing-l);
      }
      
      ul.icons {
        /* easy way to create a vertical line without extra div */
        background: linear-gradient(var(--primary), var(--primary)) center / 3px 100% no-repeat;


        li {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--primary);
          width: 3rem;
          height: 3rem;
          border-radius: var(--border-radius-l);
          

        }
      }

      ul.texts {
      }
    }
  }

  ul {
    list-style: none;
  }
</style>
