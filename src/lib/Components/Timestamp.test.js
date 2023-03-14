import "@testing-library/jest-dom";
import { Timestamp } from "../index.js";
import { render } from "@testing-library/svelte";

test("Component renders", () => {
  const comp = render(Timestamp);
  expect(comp).toBeDefined();
});

test("30 seconds ago", async () => {
  const { findByText } = render(Timestamp, { props: { date: new Date(Date.now() - 30000) } });

  expect(await findByText(/30 seconds ago/i)).toBeTruthy();
});

test("30 minutes ago", async () => {
  const { findByText } = render(Timestamp, { props: { date: new Date(Date.now() - 1800000) } });

  expect(await findByText(/30 minutes ago/i)).toBeTruthy();
});

test("12 hours ago", async () => {
  const { findByText } = render(Timestamp, { props: { date: new Date(Date.now() - 43200000) } });

  expect(await findByText(/12 hours ago/i)).toBeTruthy();
});