import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";

export default function TaskForm() {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      alert("All fields are required!");
      return;
    }

    await addTask({
      title,
      description,
      dueDate,
      completed,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setCompleted(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mt-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Add a New Todo</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Todo Title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Todo Description"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 font-bold mr-2">Completed:</label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Todo
      </button>
    </form>
  );
}
