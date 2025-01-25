import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { toast } from "react-toastify";
import TaskItem from "./TaskItem";
import { TasksContext } from "../../context/TaskContext";
import { Task } from "../../types/task";
import { userEvent } from "@vitest/browser/context";

test("renders TaskItem and handles interactions correctly", async () => {
  const mockTask: Task = {
    uuid: "1",
    title: "Test Task",
    description: "Test Description",
    dueDate: "2025-01-31T00:00:00.000Z",
    completed: false,
  };
  const updateTaskMock = vi.fn(() => Promise.resolve(true));
  const deleteTaskMock = vi.fn(() => Promise.resolve(true));
  const onTaskUpdateMock = vi.fn();
  const onDescriptionClickMock = vi.fn();

  const toastSuccessMock = vi.spyOn(toast, "success");
  const toastErrorMock = vi.spyOn(toast, "error");

  const screen = render(
    <TasksContext.Provider
      value={{
        addTask: vi.fn(),
        deleteTask: deleteTaskMock,
        fetchTasks: vi.fn(),
        tasks: [],
        updateTask: updateTaskMock,
      }}
    >
      <TaskItem
        task={mockTask}
        isEditing={false}
        onTaskUpdate={onTaskUpdateMock}
        onDescriptionClick={onDescriptionClickMock}
      />
    </TasksContext.Provider>
  );

  // Ensure task details are rendered
  const checkbox = screen.getByRole("checkbox");
  const title = screen.getByText("Test Task");
  const dueDate = screen.getByText("Due on 2025-01-31");
  const description = screen.getByText("Test Description");
  const deleteButton = screen.getByRole("button");

  await expect.element(checkbox).toBeInTheDocument();
  await expect.element(title).toBeInTheDocument();
  await expect.element(dueDate).toBeInTheDocument();
  await expect.element(description).toBeInTheDocument();
  await expect.element(deleteButton).toBeInTheDocument();

  // Test task completion status change
  await userEvent.click(checkbox);
  expect(updateTaskMock).toHaveBeenCalledWith("1", { completed: true });

  // Test description edit click
  await userEvent.click(description);
  expect(onDescriptionClickMock).toHaveBeenCalledOnce();

  // Test task deletion
  await userEvent.click(deleteButton);
  expect(deleteTaskMock).toHaveBeenCalledWith("1");
  expect(toastSuccessMock).toHaveBeenCalledWith(`Task "Test Task" removed`);

  // Simulate failed task deletion
  deleteTaskMock.mockResolvedValueOnce(false);
  await userEvent.click(deleteButton);
  expect(toastErrorMock).toHaveBeenCalledWith(
    `Removing task Test Task failed.`
  );

  // Test description form submission
  // const input = screen.getByText("Test Description");
  // const saveButton = screen.getByRole("button", { name: "Save" });

  // await userEvent.fill(input, "Updated Description");
  // await userEvent.click(saveButton);

  // expect(updateTaskMock).toHaveBeenCalledWith("1", {
  //   description: "Updated Description",
  // });
  // expect(toastSuccessMock).toHaveBeenCalledWith("Task Test Task updated");
  // expect(onTaskUpdateMock).toHaveBeenCalledOnce();
});
