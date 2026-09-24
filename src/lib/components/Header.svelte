<script>
	import Picture from '$lib/components/Picture.svelte';

	import logoAvif from '$lib/assets/logo.avif';
	import logoWebp from '$lib/assets/logo.webp';
	import logoPng from '$lib/assets/logo.png';

	import logoDarkAvif from '$lib/assets/logoDark.avif';
	import logoDarkWebp from '$lib/assets/logoDark.webp';
	import logoDarkPng from '$lib/assets/logoDark.png';
</script>

<header>
	<Picture 
		avif={logoAvif}
		webp={logoWebp}
		png={logoPng}
		darkAvif={logoDarkAvif}
		darkWebp={logoDarkWebp}
		darkPng={logoDarkPng}
		alt="Africanair logo"
		width="230"
		height="80"
		loading="eager"
		fetchpriority="high"
	/>
	<!-- mobile nav -->
	<nav>
	<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
	</nav>

	<!-- desktop nav -->
	<nav>
		
	</nav>
</header>

<style>
	header {
		display: flex;
		padding: 1rem;

		svg {
			width: 200px;
			height: 20px;
		}
	}
</style>