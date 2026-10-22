<script>
    import { page } from "$app/state";

    const tabs = [
        {
            id: 'map',
            label: 'Map'
        },
        {
            id: 'table',
            label: 'Table'
        }
    ]

</script>

<nav>
    {#each tabs as tab }
    {@const href =  `/${page.params.city}/${tab.id}`}
    {@const active = page.url.pathname === href}
    <ul>
        <li>
            <a {href} class:active>
                {tab.label}
            </a>
        </li>
    </ul>
    {#if tab.label === 'Table'}
        <section>
            <!-- <DatePicker /> -->
        </section>
    {/if}
    {/each}
</nav>


<style>
    nav {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-bottom: 2px solid var(--border-color);
        border-top: 2px solid var(--border-color);
        background-color: var(--background-secondary);
        ul {
            padding: .2rem;
            list-style: none;
            li {
                text-align: center;
                a {
                    color: var(--text-primary);

                    &.active {
                        border-bottom: 1px solid var(--primary)
                    }
                }
            }
        }
    }

</style>