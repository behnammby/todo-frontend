import { useState } from "react";
import { useTasks } from "../../context/TaskContext";

export default function TaskForm() {
  const { addTask } = useTasks();

  const [title, setTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  function handleAddTask() {
    if (!title.length) {
      return;
    }

    addTask({
      title,
      description: title,
      dueDate,
      completed: false,
    }).then(() => {
      alert("Task added!");
    });
  }

  return (
    <form className="w-full max-w-md mx-auto px-4 py-2 mt-5">
      <div className="flex items-center border-b-2 border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
        />
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>
    </form>
  );
}
