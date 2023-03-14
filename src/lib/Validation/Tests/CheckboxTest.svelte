<script>
  import { Form } from "../../index.js";
  import Input from "../../../routes/Input.svelte";
  import { required } from "../rules.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<Form on:submit={(e) => dispatch('submit', {...e.details})}>
  <Input type="checkbox" name="checkbox" rules={[required]}></Input>
</Form>