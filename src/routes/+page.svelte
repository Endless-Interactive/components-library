<script>
  import Timestamp from "../lib/Components/Timestamp.svelte";
  import { Form } from "$lib";
  import { email, required } from "$lib/Validation/rules.js";
  import Input from "./Input.svelte";

  let timestamp2 = new Date(Date.now() + 60000);
</script>

<Timestamp />
<Timestamp date={timestamp2} />

<Form>
  <Input name="Email" rules={[required, email]}></Input>
  <Input name="Username" rules={[required]}></Input>
</Form>

<Form>
  <Input type="checkbox" name="Custom" rules={[required]}></Input>
</Form>

<Form>
  <Input type="number" name="Custom" rules={[required]}></Input>
</Form>

<Form>
  <Input type="radio" name="Custom" rules={[required]}></Input>
  <Input type="radio" name="Custom" rules={[required]}></Input>
</Form>