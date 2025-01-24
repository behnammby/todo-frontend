import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import api from "../services/api";
import { Task } from "../types/task";

interface TasksContextType {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (todo: Omit<Task, "uuid">) => Promise<boolean>;
  updateTask: (id: string, updatedTodo: Partial<Task>) => Promise<boolean>;
  deleteTask: (id: string) => Promise<boolean>;
}

const initialContext: TasksContextType = {
  tasks: [],
  fetchTasks: async () => {},
  addTask: async () => false,
  updateTask: async () => false,
  deleteTask: async () => false,
};

export const TasksContext = createContext<TasksContextType>(initialContext);

export const useTasks = () => {
  return useContext(TasksContext)!;
};

export default function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function fetchTasks(ignore: boolean = false) {
    try {
      const response = await api.get("/tasks");
      if (ignore) {
        console.log("Ignore setting tasks");
        return;
      }
      console.log("Setting tasks");
      console.log("response.data :>> ", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch task:", error);
    }
  }

  async function addTask(task: Omit<Task, "uuid">) {
    try {
      const response = await api.post("/tasks", task);
      setTasks((prev) => [...prev, response.data]);

      return true;
    } catch (error) {
      console.error("Failed to add task:", error);

      return false;
    }
  }

  async function updateTask(uuid: string, updatedTask: Partial<Task>) {
    try {
      const response = await api.put(`/tasks/${uuid}`, updatedTask);
      setTasks((prev) =>
        prev.map((task) =>
          task.uuid === uuid ? { ...task, ...response.data } : task
        )
      );

      return true;
    } catch (error) {
      console.error("Failed to update task:", error);

      return false;
    }
  }

  async function deleteTask(uuid: string) {
    try {
      await api.delete(`/tasks/${uuid}`);
      setTasks((prev) => prev.filter((task) => task.uuid !== uuid));

      return true;
    } catch (error) {
      console.error("Failed to delete task:", error);

      return false;
    }
  }

  useEffect(() => {
    let ignore = false;

    fetchTasks(ignore);

    // Cleanup function to avoid loading tasks twice in development
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <TasksContext.Provider
      value={{ tasks, fetchTasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}
