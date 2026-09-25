<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="/src/lib/assets/styles/styleguide.css" />
	<link rel="stylesheet" href="/src/lib/assets/styles/stylesheet.css" />
	<link rel="stylesheet" href="/src/lib/assets/styles/globals.css" />
</svelte:head>

{@render children()}
