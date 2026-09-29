<script>
	import { onMount } from 'svelte';

	let {
		avif, webp, png, jpg,
		darkAvif, darkWebp, darkPng, darkJpg,
		alt = '',
		width,
		height,
		sizes,
		loading = 'lazy',
		fetchpriority = 'auto',
		class: className = '',
		...restProps
	} = $props();

	let fallbackSrc = $derived(png || jpg);
	let darkFallbackSrc = $derived(darkPng || darkJpg);
	let themeOverride = $state(null);
	let hasDarkSources = $derived(Boolean(darkAvif || darkWebp || darkFallbackSrc));
	let darkSourceMedia = $derived(
		themeOverride === null
			? '(prefers-color-scheme: dark)'
			: themeOverride && hasDarkSources
				? 'all'
				: 'not all',
	);
	let lightSourceMedia = $derived(
		themeOverride === false || (themeOverride === true && !hasDarkSources)
			? 'all'
			: themeOverride === true
				? 'not all'
				: 'all',
	);

	onMount(() => {
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
		const themeSwitch = document.getElementById('theme-switch');
		const updateTheme = () => {
			themeOverride = themeSwitch?.checked ? !systemTheme.matches : null;
		};

		updateTheme();
		systemTheme.addEventListener('change', updateTheme);
		themeSwitch?.addEventListener('change', updateTheme);

		return () => {
			systemTheme.removeEventListener('change', updateTheme);
			themeSwitch?.removeEventListener('change', updateTheme);
		};
	});
</script>

<picture class={className}>
	<!-- Dark Mode -->
	{#if darkAvif}<source media={darkSourceMedia} type="image/avif" srcset={darkAvif} {sizes} />{/if}
	{#if darkWebp}<source media={darkSourceMedia} type="image/webp" srcset={darkWebp} {sizes} />{/if}
	{#if darkFallbackSrc}<source media={darkSourceMedia} srcset={darkFallbackSrc} {sizes} />{/if}

	<!-- Light Mode -->
	{#if avif}<source media={lightSourceMedia} type="image/avif" srcset={avif} {sizes} />{/if}
	{#if webp}<source media={lightSourceMedia} type="image/webp" srcset={webp} {sizes} />{/if}

	<!-- Fallback -->
	<img
		src={fallbackSrc}
		{alt}
		{width}
		{height}
		{sizes}
		{loading}
		{fetchpriority}
		decoding="async"
		{...restProps}
	/>
</picture>

<style>
	picture {
		display: flex;
		align-items: center;
	}
	img {
		max-width: 100%;
		height: auto;
	}
</style>