import "@testing-library/jest-dom";
import { Form } from "../index.js";
import { fireEvent, render } from "@testing-library/svelte";

test("Component renders", () => {
  const comp = render(Form);
  expect(comp).toBeDefined();
});

test("Form can be submitted if not using validation", () => {
  const { getByText, component } = render(Form, { props: { disableValidation: true } });

  const submit = getByText(/submit/i);

  const mock = vi.fn();

  component.$on("submit", mock);

  fireEvent.click(submit);

  expect(mock).toBeCalled();
});

test("Form can not be submitted if using validation", () => {
  const { getByText, component } = render(Form);

  const submit = getByText(/submit/i);

  const mock = vi.fn();

  component.$on("submit", mock);

  fireEvent.click(submit);
  expect(mock).not.toBeCalled();
});