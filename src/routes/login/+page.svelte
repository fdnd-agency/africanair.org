<script>
  import { enhance } from "$app/forms";
  import lock from "$lib/assets/images/Lock.svg";
</script>

<main>
  <section>
    <img src={lock} alt="Lock" />

    <h1>Login</h1>

    <p>Enter your email to receive a one-time login code</p>

    <form method="POST" use:enhance>
      <label for="email">E-mail address</label>
      <input
        placeholder="E-mail address"
        type="email"
        name="email"
        required
        autocomplete="email"
      />
      <button>Send Code</button>
    </form>
    <p>You’ll receive a 6-digit code by email within a few seconds.</p>
  </section>
</main>

<style>
  main {
    display: grid;
    min-height: 75dvh;
    place-items: center;
    padding: 1.875rem;

    section {
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 26rem;
      padding: var(--spacing-2xl) var(--spacing-l);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-m);
      background-color: var(--background-secondary);

      img {
        width: 2.25rem;
        height: 2.25rem;
        padding: var(--spacing-xs);
        border: 1px solid var(--primary);
        border-radius: var(--border-radius-l);
        box-sizing: content-box;
        box-shadow: 1px 0px 4px var(--primary);
      }

      h1 {
        text-align: center;
        text-wrap: balance;
      }

      p:first-of-type {
        text-align: center;
        text-wrap: balance;
        margin-block-end: var(--spacing-2xl);
        font-size: var(--font-size-s);
        color: var(--text-secondary);
      }

      p:last-of-type {
        font-size: 0.875rem;
        color: var(--text-secondary);
        text-align: center;
        text-wrap: balance;
        margin-block-start: var(--spacing-m);
      }

      form {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: var(--spacing-m);

        label[for="email"] {
          /* Label is visually hidden but still readable with a screenreader. This has been done according to the design */
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          border: 0;
          white-space: nowrap;
        }

        input,
        button {
          width: 100%;
          min-height: 2.5rem;
        }

        input {
          padding-inline: var(--spacing-xl);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-l);
          color: var(--text-primary);
          background-color: var(--background-primary);

          &:focus {
            outline: 2px solid var(--primary);
            outline-offset: 1px;
          }
        }

        button {
          padding-inline: var(--spacing-xl);
          border: 0;
          border-radius: var(--border-radius-l);
          color: var(--text-inverse);
          cursor: pointer;
          background-color: var(--primary);

          &:hover {
            background-color: hsl(203, 93%, 34%);
          }
        }
      }
    }
  }
</style>
