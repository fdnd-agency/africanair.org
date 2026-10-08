<section>
  <h2>Air quality index</h2>
  <div class="legend-gradient"></div>
  <ul>
    <li>
      <span></span>
      <div>
        <p>Low</p>
        <p>0 - 21</p>
      </div>
    </li>
    <li>
      <span></span>
      <div>
        <p>Medium</p>
        <p>21 - 42</p>
      </div>
    </li>
    <li>
      <span></span>
      <div>
        <p>High</p>
        <p>42 - 65</p>
      </div>
    </li>
    <li>
      <span></span>
      <div>
        <p>Dangerous</p>
        <p>65+</p>
      </div>
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
    gap: 1rem;

    div.legend-gradient {
      display: block;
      height: 1.2rem;
      width: 100%;
      border-radius: var(--border-radius-m, 4px);
      border: 2px solid var(--background-secondary);
      background: linear-gradient(90deg, var(--status-good) 0%, var(--status-medium) 21%, var(--status-high) 42%, var(--status-dangerous) 65%, rgba(73, 0, 122, 1) 100%);
    }

    ul {
      display: flex;
      justify-content: space-between;
      list-style: none;
      padding-bottom: 1rem;

      li {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;

        span {
          display: inline-block;
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
          border: 1px solid var(--border-lightmode-only);
          margin-top: var(--spacing-m);
        }

        div {
          display: flex;
          flex-direction: column;
          p {
            margin: 0;
            line-height: 1.2;

            &:nth-child(2) {
              font-size: var(--font-size-s);
              color: var(--text-secondary);
            }
          }
        }
      }
      /* compacted css to give each span dot the correct color with vars */
      li:nth-child(1) span { background-color: var(--status-good); }
      li:nth-child(2) span { background-color: var(--status-medium); }
      li:nth-child(3) span { background-color: var(--status-high) }
      li:nth-child(4) span { background-color: var(--status-dangerous); }
    }
  }
</style>