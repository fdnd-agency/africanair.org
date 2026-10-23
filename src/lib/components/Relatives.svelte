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

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-block: 1rem;

    p {
      color: var(--text-secondary);
    }
  }
  
  form {
    display: inline-flex;
    border: 2px solid var(--primary);
    border-radius: var(--border-radius-l);
    padding: var(--spacing-2xs);
    background-color: var(--background-primary);

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
        color: var(--text-light);
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