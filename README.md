# components-library

## Features
-[x] Timestamp
- [x] Form validation
  - [x] Custom validation rules
  - [x] Text
    - [x] Email
    - [x] Min/Max length
    - [x] Required
  - [x] Number (Requires string to be a number)
    - [x] Min/Max value
  - [ ] Checkbox/Radio
    - [ ] Required
  - [ ] Select
    - [ ] Required
  - [ ] Multiple
    - [ ] Required


## Validation

### Custom validation rules
```js
// Custom validation function without parameters
function custom(value) {
    const passed = value === "hello";
    return { passed, reason: 'This field must say "hello"' };
}

// This input will only allow the word "hello"
<input type="text" use:validate={custom} />


// Custom validation function with parameters
function custom(text) {
  return function(value) {
    const passed = value === text;
    return { passed, reason: `This field must say "${text}"` };
  }
}

// This input will only allow the word "hello"
<input type="text" use:validate={custom("hello")} />
```