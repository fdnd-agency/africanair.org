<script>
  import { selectedStandard, standards } from '$lib/relatives.js';

  let activeThresholds = $derived(standards[$selectedStandard] || standards.EU);
</script>

<section>
  <h2>Air quality index</h2>
  <ul>
    <li>
      <span></span>
      <p>Low</p>
      <p>0 - {activeThresholds[0]}</p>
    </li>
    <li>
      <span></span>
      <p>Medium</p>
      <p>{activeThresholds[0]} - {activeThresholds[1]}</p>
    </li>
    <li>
      <span></span>
      <p>High</p>
      <p>{activeThresholds[1]} - {activeThresholds[2]}</p>
    </li>
    <li>
      <span></span>
      <p>Hazardous</p>
      <p>{activeThresholds[2]}+</p>
    </li>
  </ul>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 100%;
    max-width: 25rem;
    margin-top: var(--spacing-s);
    gap: var(--spacing-xs);

    h2 {
      font-size: var(--font-size-s);
      color: var(--text-secondary);
    }

    ul {
      display: flex;
      justify-content: space-between;
      list-style: none;
      padding-bottom: 1rem;
      gap: var(--spacing-s);
      width: 100%;

      li {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1; 
        gap: var(--spacing-2xs);

        span {
          display: block;
          height: var(--spacing-l);
          width: 100%;
          border: 2px solid var(--background-primary-inverse);
          box-sizing: border-box;
        }

        &:first-child span {
          border-radius: var(--border-radius-m) 0 0 var(--border-radius-m);
        }
        &:last-child span {
          border-radius: 0 var(--border-radius-m) var(--border-radius-m) 0;
        }

        p {
          font-size: var(--font-size-s);
          
          &:nth-child(3) {
            color: var(--text-secondary);
          }
        }
      }

      li:nth-child(1) span {
        background: linear-gradient(90deg, var(--status-good), var(--status-medium));
      }
      li:nth-child(2) span {
        background: linear-gradient(90deg, var(--status-medium), var(--status-high));
      }
      li:nth-child(3) span {
        background: linear-gradient(90deg, var(--status-high), var(--status-hazardous));
      }
      li:nth-child(4) span {
        background: linear-gradient(90deg, var(--status-hazardous), rgba(73, 0, 122, 1));
      }
    }
  }
</style>