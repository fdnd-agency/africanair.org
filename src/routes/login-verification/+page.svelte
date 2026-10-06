<script>
  let { form } = $props();
</script>

<main>
  <section aria-labelledby="verification-heading">
    <h1 id="verification-heading">Verify your code</h1>

    <p>Enter the 6-digit code sent to your e-mail address.</p>

    <form method="POST">
      <label for="code">Login code</label>

      <input
        id="code"
        name="code"
        type="text"
        inputmode="numeric"
        autocomplete="one-time-code"
        pattern="[0-9]{6}"
        minlength="6"
        maxlength="6"
        required
        aria-invalid={form?.error ? 'true' : undefined}
        aria-describedby={form?.error ? 'code-error' : undefined}
      />

      {#if form?.error}
        <p id="code-error" role="alert">
          {form.error}
        </p>
      {/if}

      <button type="submit">Log in</button>
    </form>
  </section>
</main>