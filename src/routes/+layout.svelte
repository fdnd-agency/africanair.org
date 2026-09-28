<script>
	import favicon from '$lib/assets/icons/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="/src/lib/assets/styles/stylesheet.css" />
</svelte:head>

<Header />

{@render children()}
