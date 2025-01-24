import { useState } from "react";
import { Task } from "../../types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
}

export default function TasksList({ tasks }: Props) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <ul className="divide-y divide-gray-200 px-4">
      {tasks.map((t) => (
        <TaskItem
          key={t.uuid}
          task={t}
          isEditing={editingTask !== null && editingTask.uuid === t.uuid}
          onDescriptionClick={() => setEditingTask(t)}
        />
      ))}
    </ul>
  );
}
