<script>
  import Picture from '$lib/components/Picture.svelte';

  import logoAvif from '$lib/assets/logo.avif';
  import logoWebp from '$lib/assets/logo.webp';
  import logoPng from '$lib/assets/logo.png';

  import logoDarkAvif from '$lib/assets/logoDark.avif';
  import logoDarkWebp from '$lib/assets/logoDark.webp';
  import logoDarkPng from '$lib/assets/logoDark.png';
  
  const navLinks = [
    { href: '/about', label: 'About us' },
    { href: '/login', label: 'Login' },
    { href: '/share-data', label: 'Share data' }
  ];
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

  <button popovertarget="mobilenav">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>Menu</span>
  </button>

  <!-- mobile nav -->
  <nav id="mobilenav" popover class="mobile">
		<button popovertarget="mobilenav">
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			<span>Menu</span>
		</button>
		<ul>
			{#each navLinks as link}
				<li>
					<a href={link.href}>{link.label}</a>
				</li>
			{/each}
		</ul>

  </nav>

  <!-- desktop nav -->
  <nav class="desktop">
    {#each navLinks as link}
      <a href={link.href}>{link.label}</a>
    {/each}
  </nav>
</header>

<style>
  header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;

    nav.desktop {
      display: none;
      gap: 1.5rem;

      @media (min-width: 789px) {
        display: flex;
      }
    }

    button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: none;
      cursor: pointer;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.7;
      }

      @media (min-width: 789px) {
        display: none;
      }
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  nav.mobile {
    flex-direction: column;
		width: 100%;
		height: 100%;
    gap: 1rem;
    border: none;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    margin-top: 1rem;
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
    transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete;

    &::backdrop {
      background-color: rgba(0, 0, 0, 0);
      transition: background-color 0.3s ease,
				overlay 0.3s allow-discrete,
				display 0.3s allow-discrete;
    }

    &:popover-open {
      display: flex;
      opacity: 1;
      transform: translateY(0) scale(1);

      &::backdrop {
        background-color: rgba(0, 0, 0, 0.4);
      }

      @starting-style {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
        
        &::backdrop {
          background-color: rgba(0, 0, 0, 0);
        }
      }
    }

    @media (min-width: 789px) {
      display: none;
    }

    a {
      text-decoration: none;
      color: inherit;
      padding: 0.5rem;
      border-radius: 6px;
      transition: background-color 0.2s ease, transform 0.2s ease;
      
      &:active {
        transform: scale(0.98);
      }
    }
  }
</style>