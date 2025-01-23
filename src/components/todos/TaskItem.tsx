import { useTasks } from "../../context/TaskContext";
import { Task } from "../../types/task";

interface TaskItemProps {
  task: Task;
}

export default function ({ task }: TaskItemProps) {
  const { updateTask, deleteTask } = useTasks();

  const toggleStatus = () => {
    updateTask(task.uuid, {
      completed: !task.completed,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p className="text-gray-600 mt-2">{task.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p
        className={`mt-2 font-semibold ${
          task.completed ? "text-green-500" : "text-red-500"
        }`}
      >
        Status: {task.completed ? "Completed" : "Incomplete"}
      </p>
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={toggleStatus}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Mark as {task.completed ? "Incomplete" : "Completed"}
        </button>
        <button
          onClick={() => deleteTask(task.uuid)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
