import Tasks from "../components/task/Tasks";
import TasksProvider from "../context/TaskContext";

export default function Home() {
  return (
    <TasksProvider>
      <Tasks />
    </TasksProvider>
  );
}
