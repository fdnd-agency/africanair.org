<script>
  import '$lib/assets/styles/stylesheet.css';
  import favicon from '$lib/assets/icons/favicon.svg';
  import Header from '$lib/components/Header.svelte';
  
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Header />

{@render children()}