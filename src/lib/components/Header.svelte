<script>
  import { onMount } from "svelte";
  import Picture from "$lib/components/Picture.svelte";

  import logoAvif from "$lib/assets/images/logo.avif";
  import logoWebp from "$lib/assets/images/logo.webp";
  import logoPng from "$lib/assets/images/logo.png";

  import logoDarkAvif from "$lib/assets/images/logoDark.avif";
  import logoDarkWebp from "$lib/assets/images/logoDark.webp";
  import logoDarkPng from "$lib/assets/images/logoDark.png";

  const navLinks = [
    { href: "/about", label: "About us" },
    { href: "/login", label: "Login" },
    { href: "/share-data", label: "Share data" },
  ];

  let mobileNav;
  let menuButton;
  let closeButton;

  // fallback for popover element if it is not supported
  onMount(() => {
    if ("popover" in HTMLElement.prototype) return;

    const toggleButtons = [menuButton, closeButton];

    mobileNav.classList.add("popover-fallback");

    const toggleMobileNav = (event) => {
      event.preventDefault();
      mobileNav.classList.toggle("fallback-open");
    };

    toggleButtons.forEach((button) =>
      button.addEventListener("click", toggleMobileNav),
    );

    return () => {
      toggleButtons.forEach((button) =>
        button.removeEventListener("click", toggleMobileNav),
      );
    };
  });
</script>

<header>
  <a class="logo" href="/">
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
  </a>

  <button bind:this={menuButton} popovertarget="mobilenav">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span>Menu</span>
  </button>

  <!-- mobile nav -->
  <nav bind:this={mobileNav} id="mobilenav" popover class="mobile">
    <header>
      <h3>Africanair.org</h3>
      <button bind:this={closeButton} popovertarget="mobilenav">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="currentColor"
          />
        </svg>
        <span>Close</span>
      </button>
    </header>

    {#each navLinks as link}
      <a href={link.href}>{link.label}</a>
    {/each}
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
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: auto;
    width: 100%;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
    gap: 1rem;

    a.logo {
      grid-column: 2;
      grid-row: 1;
      justify-self: center;
      display: flex;
      align-items: center;

      @media (min-width: 789px) {
        grid-column: 1;
        justify-self: start;
      }
    }

    button {
      display: flex;
      grid-column: 1;
      grid-row: 1;
      justify-self: start;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      background: none;
      border: none;
      cursor: pointer;
      transition: opacity 0.2s ease;

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      &:hover {
        opacity: 0.7;
      }

      @media (min-width: 789px) {
        display: none;
      }
    }

    nav.desktop {
      display: none;

      @media (min-width: 789px) {
        display: flex;
        grid-column: 2;
        grid-row: 1;
        justify-self: end;
        gap: 1.5rem;
      }

      a {
        color: var(--text-primary);
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius-m);
        transition:
          color 0.15s ease,
          background-color 0.15s ease,
          text-decoration 0.15 ease;

        &:hover {
          text-decoration: underline;

          @media (prefers-reduced-motion: no-preference) {
            text-decoration: none;
            background-color: var(--button-primary-inverse);
            color: var(--text-primary-inverse);
          }
        }
      }
    }

    @media (min-width: 789px) {
      grid-template-columns: auto 1fr;
    }
  }

  nav.mobile {
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: none;
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
    transition:
      opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
      overlay 0.3s allow-discrete,
      display 0.3s allow-discrete;

    &::backdrop {
      background-color: rgba(0, 0, 0, 0);
      transition:
        background-color 0.3s ease,
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
      color: inherit;
      padding: 1rem;
      border-radius: var(--border-radius-s);
      transition:
        background-color 0.2s ease,
        transform 0.2s ease;

      &:active {
        transform: scale(0.98);
      }
    }
  }

  :global(nav.mobile.popover-fallback) {
    display: none;

    &.fallback-open {
      display: flex;
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>
