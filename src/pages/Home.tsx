import TaskForm from "../components/todos/TaskForm";
import TaskList from "../components/todos/TaskList";
import TasksProvider from "../context/TaskContext";

export default function Home() {
  return (
    <TasksProvider>
      <div>
        <h1>Todo List Application</h1>
        <TaskForm />
        <TaskList />
      </div>
    </TasksProvider>
  );
}
