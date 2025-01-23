import { useTasks } from "../../context/TaskContext";

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: boolean;
    dueDate: string;
  };
}

export default function ({ task }: TaskItemProps) {
  const { updateTask, deleteTask } = useTasks();

  const toggleStatus = () => {
    updateTask(task.id, { status: !task.status });
  };

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Status: {task.status ? "Completed" : "Incomplete"}</p>
      <button onClick={toggleStatus}>
        Mark as {task.status ? "Incomplete" : "Completed"}
      </button>
      <button
        onClick={() => deleteTask(task.id)}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </div>
  );
}
