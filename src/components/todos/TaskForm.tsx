import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";

export default function TaskForm() {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

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
      status,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("Pending");
  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <label>
        Completed:
        <input
          type="checkbox"
          checked={status === "Completed"}
          onChange={(e) =>
            setStatus(e.target.checked ? "Completed" : "InProgress")
          }
        />
      </label>
      <button type="submit">Add Todo</button>
    </form>
  );
}
