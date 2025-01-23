import TaskForm from "../components/todos/TaskForm";
import TaskList from "../components/todos/TaskList";
import TasksProvider from "../context/TaskContext";

export default function Home() {
  return (
    <TasksProvider>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6">My ToDo</h1>
        <TaskForm />
        <TaskList />
      </div>
    </TasksProvider>
  );
}
