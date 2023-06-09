import { check } from "prettier";

let data = {};

let lastId = 0;

export function validateForm(node) {
  if (data[lastId] === undefined && node.getAttribute("data-form-id") === null) {
    data[lastId] = {
      node: node,
      values: []
    };

    node.setAttribute("data-form-id", lastId);

    observerFormInputs(node);
    lastId++;
  }
}

function observerFormInputs(formNode, id) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.removedNodes.length > 0) {
        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            removeNodeInData(id, node);
          }
        });
      }
    });
  });

  observer.observe(formNode, {
    childList: true,
    subtree: true
  });
}

function removeNodeInData(id, node) {
  if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute("data-validation-id") !== null) {
    const validationId = node.getAttribute("data-validation-id");
    const index = data[id].values.findIndex((item) => item.node.getAttribute("data-validation-id") === validationId);

    if (index !== -1) {
      data[id].values.splice(index, 1);
      return true;
    }
  }

  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      if (removeNodeInData(id, node.childNodes[i])) {
        return true;
      }
    }
  }

  return false;
}

function findNearestForm(node) {
  let current = node;

  while (current !== null) {
    if (current.nodeType === Node.ELEMENT_NODE && current.nodeName === 'FORM') {
      if (current.getAttribute("data-form-id") !== null)
        return current;

      current.setAttribute("data-form-id", lastId);
      data[lastId] = {
        node: current,
        values: []
      };

      observerFormInputs(current, lastId);
      lastId++;
      return current;
    }

    current = current.parentNode;
  }

  return null;
}

export function validate(node, rules) {
  const form = findNearestForm(node);

  if (form === null) {
    throw new Error("No form found");
  }

  const id = form.getAttribute("data-form-id");

  if (typeof rules === "function") {
    rules = [rules];
  }

  node.setAttribute("data-validation-id", data[id].values.length);

  data[id].values.push({ node, rules });

  function handleInput(event) {
    const { passed, errors } = checkRules(rules, parseNodeValue(event.target));

    node.dispatchEvent(new CustomEvent("changed", { detail: { passed, "_t": Date.now() } }));

    if (passed)
      node.dispatchEvent(new CustomEvent("success", { detail: { "_t": Date.now() } }));
    else
      node.dispatchEvent(new CustomEvent("failed", { detail: { errors, "_t": Date.now() } }));

    checkAllRules(id);
  }

  node.addEventListener("input", handleInput);

  checkAllRules(id);

  return {
    destroy() {
      node.removeEventListener("input", handleInput);
    }
  };
}

function parseNodeValue(node) {
  switch (node.type) {
    case "checkbox":
      return node.checked;
    default:
      return node.value;
  }
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
    const { errors, passed } = checkRules(rules, parseNodeValue(node));

    allErrors = allErrors.concat(errors);

    return passed;
  }).every(Boolean);

  if (form.node === null)
    return;

  form.node.dispatchEvent(new CustomEvent("changed", { detail: { passed: isValid, "_t": Date.now() } }));

  if (isValid)
    form.node.dispatchEvent(new CustomEvent("success", { detail: { "_t": Date.now() } }));
  else
    form.node.dispatchEvent(new CustomEvent("failed", { detail: { errors: allErrors, "_t": Date.now() } }));
}