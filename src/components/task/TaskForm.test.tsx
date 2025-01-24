import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import TaskForm from "./TaskForm";

test("renders name", async () => {
  const screen = render(<TaskForm />);

  await expect.element(screen.getByPlaceholder("I wanna")).toBeInTheDocument();
});
