<script>
  import { selectedStandard } from '$lib/relatives.js';
</script>

<section>
  <form>
    <label>
      <input type="radio" name="choice" value="EU" bind:group={$selectedStandard}> 
      EU
    </label>
    <label>
      <input type="radio" name="choice" value="WHO" bind:group={$selectedStandard}> 
      WHO
    </label>
  </form>
</section>