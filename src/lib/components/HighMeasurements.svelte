<script>
  let stationshazardous = "11";
  let elevated = "3";
</script>

<section>
  <p><em>{stationshazardous}</em> stations are currently measuring hazrdous air quality <em>- {elevated} elevated </em></p>
</section>

<style> 
  section {
    display: flex;
    padding: 1rem;
    background-color: var(--alert-background);
    border-radius: var(--border-radius-m);
    margin-block: 1rem;
    border-left: 2px solid red;

    em {
      font-style: normal;
      font-weight: 700;
      color: var(--alert-text)
    }
  }
</style>