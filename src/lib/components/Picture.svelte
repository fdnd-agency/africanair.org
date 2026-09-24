<script>
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
</script>

<picture class={className}>
	<!-- Dark Mode -->
	{#if darkAvif}<source media="(prefers-color-scheme: dark)" type="image/avif" srcset={darkAvif} {sizes} />{/if}
	{#if darkWebp}<source media="(prefers-color-scheme: dark)" type="image/webp" srcset={darkWebp} {sizes} />{/if}
	{#if darkFallbackSrc}<source media="(prefers-color-scheme: dark)" srcset={darkFallbackSrc} {sizes} />{/if}

	<!-- Light Mode -->
	{#if avif}<source type="image/avif" srcset={avif} {sizes} />{/if}
	{#if webp}<source type="image/webp" srcset={webp} {sizes} />{/if}

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
		display: inline-block;
	}
	img {
		max-width: 100%;
		height: auto;
	}
</style>