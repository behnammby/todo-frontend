import { useTasks } from "../../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks } = useTasks();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">My Todos</h2>
      {tasks.length > 0 ? (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskItem key={task.uuid} task={task} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No todos yet. Add some!</p>
      )}
    </div>
  );
}
