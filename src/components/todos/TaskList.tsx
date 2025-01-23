import { useTasks } from "../../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks } = useTasks();

  return (
    <div>
      <h2>My Todos</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.uuid} task={task} />)
      ) : (
        <p>No todos yet. Add some!</p>
      )}
    </div>
  );
}
