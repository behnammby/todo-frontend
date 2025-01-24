import { Header } from "../components/layout/Header";
import Tasks from "../components/task/Tasks";
import TasksProvider from "../context/TaskContext";

export default function Home() {
  return (
    <TasksProvider>
      <div className="flex flex-col max-w-md mx-auto mt-16">
        <Header />
        <Tasks />
      </div>
    </TasksProvider>
  );
}
