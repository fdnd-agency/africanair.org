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
        <ul>
            <li>
                <button onclick={value === tab.id}>
                    {tab.label}
                </button>
            </li>
        </ul>
        {/each}
    </nav>
</main>

<style>

</style>