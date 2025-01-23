import Header from "../components/layout/Header";
import TaskForm from "../components/todo/TaskForm";
import TaskList from "../components/todo/TaskList";
import TasksProvider from "../context/TaskContext";

export default function Home() {
  return (
    <TasksProvider>
      <div className="container mx-auto p-6">
        <Header />
        <TaskForm />
        <TaskList />
      </div>
    </TasksProvider>
  );
}
