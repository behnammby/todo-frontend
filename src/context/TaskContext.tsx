import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import api from "../services/api";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

interface TasksContextType {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (todo: Omit<Task, "id">) => Promise<void>;
  updateTask: (id: string, updatedTodo: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const initialContext: TasksContextType = {
  tasks: [],
  fetchTasks: async () => {},
  addTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
};

export const TasksContext = createContext<TasksContextType>(initialContext);

export const useTasks = () => {
  return useContext(TasksContext)!;
};

export default function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function fetchTasks() {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch task:", error);
    }
  }

  async function addTask(task: Omit<Task, "id">) {
    try {
      const response = await api.post("/tasks", task);
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  }

  async function updateTask(id: string, updatedTask: Partial<Task>) {
    try {
      const response = await api.put(`/tasks/${id}`, updatedTask);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, ...response.data } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }

  async function deleteTask(id: string) {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  useEffect(() => {
    let ignore = false;
    if (ignore) {
      return;
    }

    fetchTasks();

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
