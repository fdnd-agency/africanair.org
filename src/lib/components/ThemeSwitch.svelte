<label for="theme-switch">
  <input type="checkbox" id="theme-switch" />
  <svg class="sun-icon">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
  <svg class="moon-icon">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
  <span>Theme</span>
</label>

<style>
  label {
    cursor: pointer;
    position: absolute;
    background-color: var(--background-primary);
    border-radius: var(--border-radius-s);
    padding: var(--spacing-2xs);
    transition: background-color 0.15s ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      background-color: var(--button-primary-inverse);

      .sun-icon,
      .moon-icon,
      span {
        stroke: var(--text-primary-inverse);
        color: var(--text-primary-inverse);
      }
    }

    input {
      display: none;
    }

    .sun-icon,
    .moon-icon {
      transition: color 0.15s ease-out;

      width: 1.5rem;
      height: 1.5rem;

      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }

  @media (prefers-color-scheme: light) {
    .sun-icon {
      display: none;
    }

    .moon-icon {
      display: block;
    }

    :global(html:has(#theme-switch:checked)) {
      color-scheme: dark;

      .sun-icon {
        display: block;
      }

      .moon-icon {
        display: none;
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    .sun-icon {
      display: block;
    }

    .moon-icon {
      display: none;
    }

    :global(html:has(#theme-switch:checked)) {
      color-scheme: light;

      .sun-icon {
        display: none;
      }

      .moon-icon {
        display: block;
      }
    }
  }
</style>
