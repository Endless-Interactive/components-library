<script>
  import { Form } from "../../index.js";
  import Input from "../../../routes/Input.svelte";
  import { createEventDispatcher } from "svelte";

  export let rules = [];

  const dispatch = createEventDispatcher();

  function submit(e) {
    dispatch('submit', e.details)
  }
</script>

<Form on:submit={submit}>
  <Input name="text" {rules}></Input>
</Form>