<script>
  import { enhance } from "$app/forms";
  import lock from "$lib/assets/images/Lock.svg"
</script>

<main>
  <section>
    <img src={lock} alt="Lock" />

    <h1>Login</h1>

    <p>Enter your email to receive a one-time login code</p>

    <form method="POST">
      <label for="email">E-mail address</label>
      <input placeholder="E-mail address" type="text" required autocomplete="email" />
      <button>Send Code</button>
    </form>
    <p>You’ll receive a 6-digit code by email within a few seconds.</p>
  </section>
</main>

<style>
  main {
    display: grid;
    min-height: 100dvh;
    place-items: center;
    padding: 1.875rem;

    section {
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 29.375rem;
      padding: var(--spacing-2xl) var(--spacing-l);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-m);
      background-color: var(--background-secondary);

      img {
        display: flex;
        width: 2.5rem;
        height: 2.5rem;
        align-items: center;
        margin: 0 auto;
      }

      p:first-of-type {
        text-align: center;
        text-wrap: balance;
        margin-block-end: 2rem;
        font-size: 1rem;
        color: var(--text-secondary);
      }

      p:last-of-type {
        font-size: 14px;
        color: var(--text-secondary);
        text-align: center;
        text-wrap: balance;
        margin-block-start: 1rem;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        label[for='email'] {
          display: none;
        }

        input {
          background: var(--background-primary);
          border: 1px solid var(--border-color);
          width: 100%;
          padding: .5rem;
          border-radius: var(--border-radius-l);
        }

        button {
          padding: .5rem;
          width: 100%;
          border-radius: 1rem;
          border: none;
          background-color: var(--primary);
          cursor: pointer;
        }
      }

      h1 {
        text-align: center;
      }
    }
  }
</style>
