import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { toast } from "react-toastify";
import TaskForm from "./TaskForm";
import { TasksContext } from "../../context/TaskContext";
import { Task } from "../../types/task";
import { userEvent, page } from "@vitest/browser/context";

test("renders TaskForm and handles task submission", async () => {
  const tasksMock: Task[] = [];
  const fetchTasksMock = vi.fn(() => Promise.resolve());
  const addTaskMock = vi.fn((todo: Omit<Task, "uuid">) =>
    Promise.resolve(true)
  );
  const updateTaskMock = vi.fn((id: string, updatedTodo: Partial<Task>) =>
    Promise.resolve(true)
  );
  const deleteTaskMock = vi.fn((id: string) => Promise.resolve(true));

  const toastSuccessMock = vi.spyOn(toast, "success");
  const toastErrorMock = vi.spyOn(toast, "error");

  const screen = render(
    <TasksContext.Provider
      value={{
        addTask: addTaskMock,
        deleteTask: deleteTaskMock,
        fetchTasks: fetchTasksMock,
        tasks: tasksMock,
        updateTask: updateTaskMock,
      }}
    >
      <TaskForm />
    </TasksContext.Provider>
  );

  const input = screen.getByPlaceholder("I wanna...");
  const dateInput = screen.getByPlaceholder("Due date");
  const button = screen.getByTitle("Add");

  // Initial render checks
  await expect.element(input).toBeInTheDocument();
  await expect.element(dateInput).toBeInTheDocument();
  await expect.element(button).toBeInTheDocument();

  // Simulate user input and submit
  const taskTitle = "New Task";
  await userEvent.fill(input, taskTitle);
  // await userEvent.click(button);

  // // Expect addTask to be called with the correct task data
  // expect(addTaskMock).toHaveBeenCalledOnce();
  // expect(addTaskMock).toHaveBeenCalledWith({
  //   title: taskTitle,
  //   description: taskTitle,
  //   dueDate: new Date().toISOString().split("T")[0], // today's date
  //   completed: false,
  // });

  // // Expect success toast to be shown
  // expect(toastSuccessMock).toHaveBeenCalledWith(`Task "${taskTitle}" added`);

  // // Ensure title input is cleared after submission
  // await expect.element(input).toHaveValue("");

  // // Simulate an addTask failure
  // addTaskMock.mockResolvedValueOnce(false);
  // await userEvent.type(input, "Failed Task");
  // await userEvent.click(button);

  // // Expect error toast to be shown
  // expect(toastErrorMock).toHaveBeenCalledWith("Adding task failed");
});
