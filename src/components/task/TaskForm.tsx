import { useEffect, useRef, useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { toast } from "react-toastify";
import { SaveButton } from "../button/Save";

export default function TaskForm() {
  const { addTask } = useTasks();

  const [title, setTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDueDate(today());

    input.current?.focus();
  }, []);

  async function handleAddTask() {
    if (!title.length) {
      return;
    }

    await addTask({
      title,
      description: title,
      dueDate,
      completed: false,
    }).then((res) => {
      if (res) {
        toast.success(`Task "${title}" added`);

        setTitle("");
        setDueDate(today);
      } else {
        toast.error(`Adding task failed`);
      }
    });
  }

  return (
    <form
      className="w-full max-w-md mx-auto px-4 py-2 mt-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTask();
      }}
    >
      <div className="flex items-center border-b-2 border-teal-500 py-2">
        <input
          ref={input}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="I wanna..."
        />
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="Due date"
          required
        />
        <SaveButton textSize="2xl" onClick={handleAddTask} />
        {/* <button
          // className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          title="Add"
          className="text-2xl hover:text-amber-400 cursor-pointer outline-0"
          type="button"
          onClick={handleAddTask}
        >
          <TbDeviceFloppy />
        </button> */}
      </div>
    </form>
  );
}

function today() {
  return new Date().toISOString().split("T")[0];
}
