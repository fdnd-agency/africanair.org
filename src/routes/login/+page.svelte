<script>
  import lock from "$lib/assets/images/Lock.svg"
</script>

<main>
  <section>
    <img src={lock} alt="Lock" />

    <h1>Login</h1>

    <p>Enter your email to receive a one-time login code</p>

    <form>
      <label for="email">E-mail address</label>
      <input placeholder="Email address" type="text" required autocomplete="email" />
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
      flex-direction: column;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-m);
      background-color: var(--background-secondary);

      img {
        display: flex;
        width: 2rem;
        height: 2rem;
        align-items: center;
        margin: 0 auto;
      }

      h1 {
        text-align: center;
      }
    }
  }
</style>
