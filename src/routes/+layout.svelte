<script>
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="/src/lib/assets/styles/styleguide.css" />
	<link rel="stylesheet" href="/src/lib/assets/styles/stylesheet.css" />
	<link rel="stylesheet" href="/src/lib/assets/styles/globals.css" />
</svelte:head>

<Header />

{@render children()}
