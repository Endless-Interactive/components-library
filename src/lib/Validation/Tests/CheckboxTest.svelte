<script>
  import { Form } from "../../index.js";
  import Input from "../../../routes/Input.svelte";
  import { required } from "../rules.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function submit(e) {
    console.log(e);
    dispatch('submit', e.details)
  }
</script>

<Form on:submit={submit}>
  <Input type="checkbox" name="checkbox" rules={[required]}></Input>
</Form>