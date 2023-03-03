<script lang="ts">
  export let onSubmit: Function = (data) => {
    console.log(data);
  };

  let className: String;
  export { className as class };

  export let showSubmit: Boolean = true;
  export let buttonText: String = "Submit";

  function submit(e) {
    const formData = new FormData(e.target);

    // Convert data into an object
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    onSubmit(data);
  }
</script>

<form class={className} on:submit|preventDefault={submit}>
  <slot/>

  {#if showSubmit}
    <slot name="submitButton">
      <button
        type="submit">{buttonText}
      </button>
    </slot>
  {/if}
</form>