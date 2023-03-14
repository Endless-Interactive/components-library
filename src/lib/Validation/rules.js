/**
 * @param {any} value
 */
export function required(value) {
  const passed = typeof value === 'boolean' ? value : value.length > 0;
  return { passed, reason: 'This field is required' };
}

/**
 * @param {number} minLength
 */
export function minLength(minLength) {
  return function(/** @type {any} */ value) {
    const passed = value.length >= minLength;
    return { passed, reason: `This field must be at least ${minLength} characters` };
  }
}

/**
 * @param {number} maxLength
 * @returns {function(*): {reason: string, passed: boolean}}
 */
export function maxLength(maxLength) {
  return function(/** @type {any} */ value) {
    const passed = value.length <= maxLength;
    return { passed, reason: `This field must be at most ${maxLength} characters` };
  }
}

/**
 * @param {any} value
 */
export function email(value) {
  const passed = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
  return { passed, reason: 'This field must be a valid email' };
}

/**
 * @param {any} value
 */
export function number(value) {
  const passed = !isNaN(value);
  return { passed, reason: 'This field must be a number' };
}

/**
 * @param {any} min
 */
export function min(min) {
  return function(/** @type {any} */ value) {
    const passed = value >= min;
    return { passed, reason: `This field must be at least ${min}` };
  }
}

/**
 * @param {any} max
 */
export function max(max) {
  return function(/** @type {any} */ value) {
    const passed = value <= max;
    return { passed, reason: `This field must be at most ${max}` };
  }
}