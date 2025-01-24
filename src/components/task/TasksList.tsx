import { Task } from "../../types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
}

export default function TasksList({ tasks }: Props) {
  return (
    <ul className="divide-y divide-gray-200 px-4">
      {tasks.map((t) => (
        <TaskItem key={t.uuid} task={t} />
      ))}
    </ul>
  );
}
