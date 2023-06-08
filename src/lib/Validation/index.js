let data = {};

let lastId = 0;

export function validateForm(node) {
  if (data[lastId] === undefined) {
    data[lastId] = {
      node: node,
      values: []
    };
  } else {
    data[lastId].node = node;
  }

  lastId++;
}

export function validate(node, rules) {
  const id = lastId;
  if (data[id] === undefined) {
    data[id] = {
      node: null,
      values: []
    };
  }

  if (typeof rules === "function") {
    rules = [rules];
  }

  data[id].values.push({ node, rules });

  function handleInput(event) {
    let value = event.target.value;

    switch (event.target.type) {
      case "checkbox":
        value = event.target.checked;
        break;
    }

    const { passed, errors } = checkRules(rules, value);

    node.dispatchEvent(new CustomEvent("changed", { detail: { passed, "_t": Date.now() } }));

    if (passed)
      node.dispatchEvent(new CustomEvent("success", { detail: { "_t": Date.now() } }));
    else
      node.dispatchEvent(new CustomEvent("failed", { detail: { errors, "_t": Date.now() } }));

    checkAllRules(id);
  }

  node.addEventListener("input", handleInput);

  return {
    destroy() {
      node.removeEventListener("input", handleInput);
    }
  };
}

function checkRules(rules, value) {
  const passed = rules.map(rule => rule(value).passed).every(Boolean);

  const errors = rules.map(rule => {
    const result = rule(value);
    return result.passed ? null : result.reason;
  }).filter(Boolean);

  return { passed, errors };
}

function checkAllRules(id) {
  let form = data[id];
  let allErrors = [];

  let isValid = form.values.map(({ node, rules }) => {
    const { errors, passed } = checkRules(rules, node.value);

    allErrors = allErrors.concat(errors);

    return passed;
  }).every(Boolean);

  form.node.dispatchEvent(new CustomEvent("changed", { detail: { passed: isValid, "_t": Date.now() } }));

  if (isValid)
    form.node.dispatchEvent(new CustomEvent("success", { detail: { "_t": Date.now() } }));
  else
    form.node.dispatchEvent(new CustomEvent("failed", { detail: { errors: allErrors, "_t": Date.now() } }));
}