<script>
  import { Form, required } from "../../index.js";
  import Input from "../../../routes/Input.svelte";
  import { createEventDispatcher } from "svelte";
  export let show = false;

  const dispatch = createEventDispatcher();

  function submit(e) {
    dispatch('submit', e.details)
  }
</script>

<Form on:submit={submit}>
  <Input name="text" rules={required}></Input>

  {#if show}
    <Input name="text2" rules={required}></Input>
  {/if}
</Form>