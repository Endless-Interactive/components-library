<script>
  import {validate} from "../lib/index.js";
  import { createEventDispatcher } from "svelte";

  export let name = "";
  export let type = "text";
  export let rules = [];
  let passing = false;
  let changed = false;
  let errors = [];

  const dispatch = createEventDispatcher();

  function handleFailed(e) {
    passing = false;

    errors = e.detail.errors;
  }

  $: borderColor = getColor(changed, passing);

  function getColor(changed, passing) {
    if (!changed)
      return `black`;

    return passing ? `rgba(0, 150, 0, 0.7)` : `rgba(255, 0, 0, 0.7)`;
  }

  function handleChange(e) {
    changed = true;

    dispatch("changed", type === "checkbox" ? e.target.checked : e.target.value);
  }
</script>

<div style="display: flex;flex-direction: column;">
  <label for="input-{name}">{name}</label>
  <input id="input-{name}" {type} {name} on:input={handleChange} on:change={handleChange} style="border: 2px solid {borderColor};" use:validate={rules} on:success={() => passing = true} on:failed={handleFailed}>
  {#if !passing && errors.length > 0}
    <span style="color: rgba(255, 0, 0, 0.7)">{errors}</span>
  {/if}
</div>