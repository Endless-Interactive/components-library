<script>
  import { validateForm } from "../Validation/index.js";
  import { createEventDispatcher } from "svelte";

  let className = "";
  export { className as class };

  export let showSubmit = true;
  export let buttonText = "Submit";
  export let disableValidation = false;

  let canSubmit = false;

  const dispatch = createEventDispatcher();

  function submit(e) {
    if (!canSubmit && !disableValidation) {
      return;
    }

    const formData = new FormData(e.target);

    // Convert data into an object
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    dispatch("submit", {
      data
    });
  }

  function validationChanged(bool) {
    canSubmit = bool;
  }
</script>

{#if disableValidation}
  <form
    class={className}
    on:submit|preventDefault={submit}
  >
    <slot />

    {#if showSubmit}
      <slot name="submitButton">
        <button
          type="submit">{buttonText}
        </button>
      </slot>
    {/if}
  </form>
{:else}
  <form
    use:validateForm
    on:changed={(e) => validationChanged(e.detail.passed)}
    class={className}
    on:submit|preventDefault={submit}
  >
    <slot />

    {#if showSubmit}
      <slot name="submitButton">
        <button
          disabled={!canSubmit}
          type="submit">{buttonText}
        </button>
      </slot>
    {/if}
  </form>
{/if}