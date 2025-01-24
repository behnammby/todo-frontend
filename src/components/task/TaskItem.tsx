import { Task } from "../../types/task";

interface Props {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  return (
    <li className="py-4">
      <div className="flex items-center">
        <input
          id="todo1"
          name="todo1"
          type="checkbox"
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label className="ml-3 block text-gray-900">
          <span className="text-lg font-medium">{task.title}</span>
          <span className="text-sm font-light text-gray-500">
            Due on {task.dueDate}
          </span>
        </label>
      </div>
    </li>
  );
}
