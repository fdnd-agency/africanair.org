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

<main>
    <nav>
        {#each tabs as tab }
        {@const href =  `/${page.city}/${tab.id}`}
        {@const active = page.url.pathname === href}
        <ul>
            <li>
                <a {href} class:active aria-current={active ? 'page' : undefined}>
                    {tab.label}
                </a>
            </li>
        </ul>
        {/each}
    </nav>
</main>

<style>

</style>