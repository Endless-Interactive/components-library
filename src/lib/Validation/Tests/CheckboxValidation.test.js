import { fireEvent, render, waitFor } from "@testing-library/svelte";
import CheckboxTest from "./CheckboxTest.svelte";
import "@testing-library/jest-dom";

test("Component renders", () => {
  const comp = render(CheckboxTest);
  expect(comp).toBeDefined();
});

test("Checkbox is unchecked by default", () => {
  const { getByLabelText } = render(CheckboxTest);

  expect(getByLabelText(/checkbox/i)).not.toBeChecked();
});

test("Checkbox is checked when clicked", () => {
  const { getByLabelText } = render(CheckboxTest);

  const checkbox = getByLabelText(/checkbox/i);

  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

test("Form can not be submitted when checkbox is unchecked", () => {
  const { getByText, component } = render(CheckboxTest);

  const submit = getByText(/submit/i);

  fireEvent.click(submit);
  const mock = vi.fn();

  component.$on("submit", mock);
  expect(mock).not.toBeCalled();
});

test("Form is submitted when checkbox is checked", async () => {
  const { getByLabelText, getByText, component } = render(CheckboxTest);

  const submit = getByText(/submit/i);
  const checkbox = getByLabelText(/checkbox/i);

  const mock = vi.fn();

  component.$on("submit", mock);

  await fireEvent.click(checkbox);
  await fireEvent.click(submit);

  await waitFor(() => {
    expect(mock).toBeCalled();
  });
});