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
  if (data[lastId] === undefined) {
    data[lastId] = {
      node: null,
      values: []
    };
  }

  if (typeof rules === "function") {
    rules = [rules];
  }

  data[lastId].values.push({ node, rules });

  function handleInput(event) {
    let value = event.target.value;

    switch (event.target.type) {
      case "checkbox":
        value = event.target.checked;
        break;
    }

    const { passed, errors } = checkRules(rules, value);

    node.dispatchEvent(new CustomEvent("changed", { detail: { passed } }));

    if (passed)
      node.dispatchEvent(new CustomEvent("success"));
    else
      node.dispatchEvent(new CustomEvent("failed", { detail: { errors } }));

    checkAllRules();
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

function checkAllRules() {
  for (let id in data) {
    let { node, values } = data[id];

    let isValid = values.map(({ node, rules }) => {
      return checkRules(rules, node.value).passed;
    }).every(Boolean);

    node.dispatchEvent(new CustomEvent("changed", { detail: { passed: isValid } }));

    node.dispatchEvent(new CustomEvent(isValid ? "success" : "failed"));
  }
}