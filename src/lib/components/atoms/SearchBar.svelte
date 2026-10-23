<form action="" method="GET">
  <input type="text" name="search" placeholder="Search location..." />
</form>

<style>
  form {
    @media (min-width: 375px) {
      grid-column: 1 / 3;
    }
  }

  input {
    width: 100%;
    border: 1px solid var(--border-color);
    background-color: var(--background-primary);
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius-l);
    font-size: var(--font-size-s);

    &::placeholder {
      font-weight: 600;
    }
  }
</style>
