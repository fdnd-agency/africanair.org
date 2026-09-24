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
</header>

<style>
header {

}
</style>