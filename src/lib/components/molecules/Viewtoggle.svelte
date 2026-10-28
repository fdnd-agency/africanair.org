<script>
  import { page } from "$app/state"

  const tabs = [
    {
      id: "map",
      label: "Map",
    },
    {
      id: "table",
      label: "Table",
    },
  ]
</script>

<nav>
  {#each tabs as tab}
    {@const href = `/${page.params.city}/${tab.id}`}
    {@const active = page.url.pathname === href}
    <ul>
      <li>
        <a {href} class:active>
          {tab.label}
        </a>
      </li>
    </ul>
  {/each}
</nav>

<style>
  nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 2px solid var(--border-color);
    border-top: 2px solid var(--border-color);
    background-color: var(--background-secondary);
    width: 100%;
    max-width: 64ch;
    margin: 0 auto;
    ul {
      padding: var(--spacing-2xs);
      list-style: none;

      &:first-child {
        border-right: 1px solid var(--border-color);
      }
      li {
        text-align: center;
        a {
          display: block;
          width: 50%;
          margin-inline: auto;
          color: var(--text-primary);

          &.active {
            border-bottom: 4px solid var(--primary);
          }
        }
      }
    }
  }
</style>
