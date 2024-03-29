export function required(value) {
  const passed = typeof value === "boolean" ? value : value.length > 0;
  return { passed, reason: "This field is required" };
}

export function minLength(minLength) {
  return function(/** @type {any} */ value) {
    const passed = value.length >= minLength;
    return { passed, reason: `This field must be at least ${minLength} characters` };
  };
}

export function maxLength(maxLength) {
  return function(/** @type {any} */ value) {
    const passed = value.length <= maxLength;
    return { passed, reason: `This field must be at most ${maxLength} characters` };
  };
}

export function email(value) {
  const passed = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
  return { passed, reason: "This field must be a valid email" };
}

export function number(value) {
  const passed = !isNaN(value);
  return { passed, reason: "This field must be a number" };
}

export function min(min) {
  return function(/** @type {any} */ value) {
    const passed = value >= min;
    return { passed, reason: `This field must be at least ${min}` };
  };
}

export function max(max) {
  return function(/** @type {any} */ value) {
    const passed = value <= max;
    return { passed, reason: `This field must be at most ${max}` };
  };
}