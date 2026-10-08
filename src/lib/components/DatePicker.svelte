<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let {
    selectedYear = '',
    selectedMonth = '',
    availableYears = [],
    availableMonthsByYear = {}
  } = $props();

  // Control the open/closed state of the details dropdown
  let isOpen = $state(false);

  function formatMonth(monthNumber, format = 'short') {
    const num = parseInt(monthNumber, 10);
    if (!num || isNaN(num)) return monthNumber;
    const date = new Date(Date.UTC(2000, num - 1, 1));
    return new Intl.DateTimeFormat('en-US', { month: format, timeZone: 'UTC' }).format(date);
  }

  let selectableMonths = $derived(
    (availableMonthsByYear[selectedYear] || []).map((m) => ({
      value: m,
      label: formatMonth(m, 'short')
    }))
  );

  let currentMonthLabel = $derived(formatMonth(selectedMonth, 'short'));

  function handleDateClick(type, value) {
    let y = type === 'year' ? value : selectedYear;
    let m = type === 'month' ? value : selectedMonth;

    const validMonths = availableMonthsByYear[y] || [];
    if (!validMonths.includes(m)) {
      m = validMonths[0] || '';
    }

    const nextUrl = new URL($page.url);
    if (y) nextUrl.searchParams.set('year', y);
    if (m) nextUrl.searchParams.set('month', m);

    // Close the dropdown when a selection is made
    isOpen = false;

    goto(nextUrl.toString(), {
      keepFocus: true,
      noScroll: true,
      replaceState: false
    });
  }
</script>

<!-- Bind open state here -->
<details bind:open={isOpen}>
  <summary>
    <span>{currentMonthLabel} {selectedYear}</span>
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </summary>

  <section>
    <!-- Years Section -->
    <fieldset class="section-group">
      <legend class="section-title">Select the year</legend>
      <div class="pill-grid">
        {#each availableYears as y}
          <button
            type="button"
            class="pill-btn"
            class:active={selectedYear === y}
            onclick={() => handleDateClick('year', y)}
          >
            {y}
          </button>
        {/each}
      </div>
    </fieldset>

    <hr class="divider" />

    <!-- Months Section -->
    <fieldset class="section-group">
      <legend class="section-title">Select the month</legend>
      <div class="pill-grid">
        {#each selectableMonths as m}
          <button
            type="button"
            class="pill-btn"
            class:active={selectedMonth === m.value}
            onclick={() => handleDateClick('month', m.value)}
          >
            {m.label}
          </button>
        {/each}
      </div>
    </fieldset>
  </section>
</details>

<style>
  details {
    position: relative;
    display: inline-block;
    z-index: 50;
  }

  summary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.4rem;
    color: var(--text-primary);
    border: 2px solid var(--background-secondary);
    font-weight: 700;
    cursor: pointer;
    border-radius: var(--border-radius-l);
    transition: all 0.15s ease;
  }

  details[open] summary {
    border-radius: var(--border-radius-m) var(--border-radius-m) 0 0;
    background-color: var(--background-secondary);
    color: var(--text-inverse);

  }

  svg {
    transition: transform 0.2s ease;
  }

  details[open] svg {
    transform: rotate(180deg);
  }

  section {
    position: absolute;
    top: 100%;
    left: 0;
    width: 80vw;
    background-color: var(--background-secondary);
    padding: 1.25rem;
    border-radius: 0 1.5rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-sizing: border-box;
  }

  .section-group {
    border: none;
    padding: 0;
    margin: 0;
  }

  .section-title {
    margin: 0 0 0.75rem 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-inverse);
  }

  .divider {
    border: none;
    border-top: 1px solid rgba(18, 31, 51, 0.12);
    margin: 0;
  }

  .pill-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
  }

  .pill-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 100%;
    border-radius: var(--border-radius-l);
    border: 2px solid var(--background-primary);
    background-color: transparent;
    color: var(--text-inverse);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .pill-btn:hover {
    color: var(--text-primary);
    background-color: var(--background-primary);
  }

  .pill-btn.active {
    background-color: var(--background-primary);
    color: var(--text-primary);
    border-color: transparent;
    font-weight: 700;
  }

  .pill-btn:focus-visible {
    outline: 3px solid var(--text-inverse);
    outline-offset: 2px;
  }
</style>