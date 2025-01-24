import { useTasks } from "../../context/TaskContext";
import { Task } from "../../types/task";
import { SaveButton } from "../button/Save";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  task: Task;
  isEditing: boolean;
  onDescriptionClick: () => void;
  onDescriptionChange: () => void;
}

interface TaskDescriptionForm {
  description: string;
}

export default function TaskItem({
  task,
  isEditing = false,
  onDescriptionClick,
  onDescriptionChange,
}: Props) {
  const { updateTask } = useTasks();

  const { register, handleSubmit } = useForm<TaskDescriptionForm>();

  async function handleTaskDescriptionChange(data: TaskDescriptionForm) {
    const result = await updateTask(task.uuid, {
      description: data.description,
    });

    if (result) {
      toast(`Task ${task.title} updated`);

      onDescriptionChange();
    }
  }

  return (
    <li className="py-4 flex flex-col">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label className="ml-3 w-full flex items-center justify-between text-gray-900">
          <span className="text-lg font-medium">{task.title}</span>
          <span className="text-sm font-light text-gray-500">
            Due on {task.dueDate.split("T")[0]}
          </span>
        </label>
      </div>
      <div className="flex justify-start items-center mt-3 border-l-2 border-gray-300 border-dashed pl-2.5">
        {isEditing ? (
          <form
            className="flex flex-row justify-between items-center w-full"
            onSubmit={handleSubmit(handleTaskDescriptionChange)}
          >
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              defaultValue={task.description}
              {...register("description", { required: true })}
            />
            <SaveButton textSize="xl" type="submit" />
          </form>
        ) : (
          <span
            title="Click to edit"
            className="font-light text-xs cursor-pointer w-full text-left"
            onClick={onDescriptionClick}
          >
            {task.description}
          </span>
        )}
      </div>
    </li>
  );
}
