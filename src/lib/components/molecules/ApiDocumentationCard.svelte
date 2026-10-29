<script>
  import API from "$lib/assets/images/API.svg"
  import Document from "$lib/assets/images/Document.svg"

  let { documentation } = $props()
</script>

<section>
  <header>
    <img src={API} alt="API logo" />
    <h2>API documentation</h2>
    <p>Everything you need to integrate our API.</p>
  </header>

  <ul>
    {#each documentation as d}
      <li>
        <details>
          <summary>
            <img src={Document} alt="">
            <span>
              <strong>{d.title}</strong>
              <small>{d.text}</small>
            </span>
          </summary>

          <div>
            {#if d.description}
              <p>{d.description}</p>
            {/if}

            {#if d.code}
              <ul>
                {#each d.code as c}
                  <li><code>{c}</code></li>
                {/each}
              </ul>
            {/if}

            {#if d.params}
              <dl>
                {#each d.params as p}
                  <dt><code>{p.name}</code></dt>
                  <dd>{p.text}</dd>
                {/each}
              </dl>
            {/if}

            {#each d.examples as example}
              {#if example.label}
                <p>{example.label}</p>
              {/if}
              <pre><code>{example.request}</code></pre>
            {/each}
          </div>
        </details>
      </li>
    {/each}
  </ul>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    padding: var(--spacing-l) var(--spacing-m);
    background-color: var(--background-secondary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-m);
    max-width: 80rem;

    header {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: var(--spacing-m);
      align-items: center;

      h2 {
        font-size: var(--spacing-l);
        text-wrap: balance;

        @media (width > 768px) {
          font-size: var(--spacing-xl);
        }
      }

      p {
        grid-column: 2;
        text-wrap: balance;
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-s);
      list-style: none;

      li {
        details {
          border: 2px solid var(--border-color);
          border-radius: var(--spacing-xs) var(--border-radius-m);

          summary {
            display: flex;
            align-items: center;
            gap: var(--spacing-s);
            padding: var(--spacing-s);
            cursor: pointer;
            list-style: none;

            @media (width > 768px) {
              padding: var(--spacing-m);
            }

            &::after {
              content: "";
              width: var(--spacing-xs);
              height: var(--spacing-xs);
              border-right: 2px solid currentColor;
              border-bottom: 2px solid currentColor;
              transform: rotate(45deg);
              transition: transform 0.2s ease;
            }

            img {
              width: 1.5rem;
              height: 1.5rem;
            }

            span {
              display: flex;
              flex-direction: column;
              flex: 1;
              text-wrap: balance;

              small {
                font-size: var(--font-size-xs);
                color: var(--text-secondary);
              }
            }
          }

          div {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-s);
            padding: var(--spacing-s);
            border-top: 2px solid var(--border-color);

            p {
                font-weight: bold;
                text-wrap: balance;
            }

            dl {
              display: grid;
              gap: var(--spacing-2xs) var(--spacing-m);
              text-wrap: balance;

              @media (width > 768px) {
                grid-template-columns: auto 1fr;
              }
            }

            pre {
              padding: var(--spacing-s);
              overflow-x: auto;
              font-size: 0.8rem;
              background-color: rgb(0 0 0 / 0.25);
              border-radius: var(--border-radius-s) var(--border-radius-m);
            }

            @media (width > 768px) {
              padding: var(--spacing-m);
            }
          }

          &[open] > summary::after {
            transform: rotate(-135deg);
          }
        }
      }
    }

    @media (width > 768px) {
      padding: var(--spacing-2xl);
    }
  }
</style>
