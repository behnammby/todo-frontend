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
    <div
      style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Status: {task.completed ? "Completed" : "in progress"}</p>
      <button onClick={toggleStatus}>
        Mark as {task.completed ? "in progress" : "completed"}
      </button>
      <button
        onClick={() => deleteTask(task.uuid)}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </div>
  );
}
