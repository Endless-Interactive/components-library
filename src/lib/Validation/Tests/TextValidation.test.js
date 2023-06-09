import { fireEvent, render, waitFor } from "@testing-library/svelte";
import TextTest from "./TextTest.svelte";
import "@testing-library/jest-dom";
import { required, minLength, maxLength, email } from "../rules";
import RuntimeTextTest from "./RuntimeTextTest.svelte";
test("Component renders", () => {
  const comp = render(TextTest);
  expect(comp).toBeDefined();
});

test("Text is required", async () => {
  const { getByLabelText, getByText, component } = render(TextTest, {props: {rules: [required]}});

  const submit = getByText(/submit/i);
  const input = getByLabelText(/text/i);

  const mock = vitest.fn();

  component.$on("submit", mock);

  await fireEvent.click(submit);

  await waitFor(() => {
    expect(mock).not.toBeCalled();
  });

  await fireEvent.input(input, { target: { value: "test" } });

  await fireEvent.click(submit);

  await waitFor(() => {
    expect(mock).toBeCalled();
  });
});

test("Text must be at least 5 characters long", async () => {
  const { getByLabelText, getByText, component } = render(TextTest, {props: {rules: [minLength(5)]}});

  const submit = getByText(/submit/i);
  const input = getByLabelText(/text/i);

  const mock = vitest.fn();

  component.$on("submit", mock);

  await fireEvent.input(input, { target: { value: "test" } });

  await fireEvent.click(submit);

  await waitFor(() => {
    expect(mock).not.toBeCalled();
  });

  await fireEvent.input(input, { target: { value: "testing" } });

  await fireEvent.click(submit);

  await waitFor(() => {
    expect(mock).toBeCalled();
  });
});

test("Text must not exceed 10 characters", async () => {
  const { getByLabelText, getByText, component } = render(TextTest, {props: {rules: [maxLength(10)]}});

  const submit = getByText(/submit/i);
  const input = getByLabelText(/text/i);

  const mock = vitest.fn();

  component.$on("submit", mock);

  await fireEvent.input(input, { target: { value: "testingtesting" } });

  await fireEvent.click(submit);

  await waitFor(() => {
    expect(mock).not.toBeCalled();
  });

  await fireEvent.input(input, { target: { value: "testing" } });

  await fireEvent.click(submit);

  await waitFor(() => {
    expect(mock).toBeCalled();
  });
});

test("Text must be an email", async () => {
  const { getByLabelText, getByText, component } = render(TextTest, {props: {rules: [email]}});

  const submit = getByText(/submit/i);
  const input = getByLabelText(/text/i);

  const mock = vitest.fn();

  component.$on("submit", mock);

  await fireEvent.input(input, { target: { value: "notanemail" } });

  await fireEvent.click(submit);

  await waitFor(() => {
    expect(mock).not.toBeCalled();
  });

  await fireEvent.input(input, { target: { value: "test@example.com" } });

  await fireEvent.click(submit);

  await waitFor(() => {
    expect(mock).toBeCalled();
  });
});

test("Runtime - Only one text input should be visible", async () => {
  const { getByLabelText, getByText, component } = render(RuntimeTextTest);

  const submit = getByText(/submit/i);
  const input = getByLabelText(/text/i);

  const mock = vitest.fn();

  component.$on("submit", mock);

  await fireEvent.input(input, { target: { value: "test" } });
  await fireEvent.click(submit);

  await waitFor(() => {
    expect(mock).toBeCalled();
  });
});

test("Runtime - Both should be visible", async () => {
  const { getByLabelText, getByText, component } = render(RuntimeTextTest, {props: {show: true}});

  const submit = getByText(/submit/i);
  const input = getByLabelText(/^text$/i);
  const input2 = getByLabelText(/^text2$/i);

  const mock = vitest.fn();

  component.$on("submit", mock);

  await fireEvent.input(input, { target: { value: "test" } });
  await fireEvent.click(submit);

  await waitFor(() => {
    expect(mock).not.toBeCalled();
  });

  await fireEvent.input(input2, { target: { value: "test" } });
  await fireEvent.click(submit);

  await waitFor(() => {
    expect(mock).toBeCalled();
  });
});

