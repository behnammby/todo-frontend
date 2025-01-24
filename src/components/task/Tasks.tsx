import { useTasks } from "../../context/TaskContext";
import { Header } from "./Header";
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";

export default function Tasks() {
  const { tasks } = useTasks();

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <Header />
        <TaskForm />
        <TasksList tasks={tasks} />
      </div>
    </>
  );
}
