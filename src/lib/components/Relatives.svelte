<script>
  import { selectedStandard } from '$lib/relatives.js';
</script>

<section>
  <p>Standard</p>
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

<style>
  form {
    display: inline-flex;
    border: 2px solid var(--primary);
    border-radius: var(--border-radius-l);
    padding: var(--spacing-2xs);
    background-color: var(--background-secondary);

    label {
      flex: 1;
      padding: 0.5rem 1.25rem;
      text-align: center;
      color: var(--text-primary);
      border-radius: var(--border-radius-l);
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;

      &:has(input:checked) {
        background-color: var(--primary);
      }

      /* to hide the radio buttons */
      input[type="radio"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
    }
  }
</style>