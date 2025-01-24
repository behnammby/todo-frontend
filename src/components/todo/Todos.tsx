import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import styles from "./Todos.module.css";
import { toast, ToastContainer } from "react-toastify";
import { Task } from "../../types/task";
import { useTasks } from "../../context/TaskContext";

export default function Todos() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // useEffect(() => {
  //   // Fetch tasks from API
  //   const fetchTasks = async () => {
  //     const token = localStorage.getItem("token");
  //     const response = await fetch("/api/v1/todos", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setTasks(data);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  async function handleCheckboxChange(taskId: string) {
    // const updatedTasks = tasks.map((task) =>
    //   task.uuid === taskId ? { ...task, completed: !task.completed } : task
    // );
    // setTasks(updatedTasks);
    const task = tasks.find((t) => t.uuid === taskId);
    if (!task) {
      return;
    }

    await updateTask(taskId, { completed: !task.completed }).then(() => {
      toast.success("Task status updated!");
    });
  }

  async function handleDelete(taskId: string) {
    await deleteTask(taskId)
      .then(() => {
        toast.info("Task deleted.");
      })
      .catch(() => {});
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    setShowModal(true);
  }

  async function handleSaveTask(task: Task) {
    if (editingTask) {
      // Update existing task
      // const updatedTasks = tasks.map((t) => (t.uuid === task.uuid ? task : t));
      // setTasks(updatedTasks);
      await updateTask(editingTask.uuid, editingTask).then(() => {
        toast.success("Task updated!");
      });
    } else {
      // Add new task
      // setTasks([...tasks, { ...task, uuid: String(new Date().getTime()) }]);
      await addTask(task).then(() => {
        toast.success("Task added!");
      });
    }

    setShowModal(false);
    setEditingTask(null);
  }

  return (
    <div>
      <Header />
      <div className={styles["todos-container"]}>
        <button
          className={styles["add-task-button"]}
          onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
        >
          Add Task
        </button>

        <table className={styles["todos-table"]}>
          <thead>
            <tr>
              <th>Completed</th>
              <th>Title</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.uuid}
                className={task.completed ? styles["completed-task"] : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task.uuid)}
                  />
                </td>
                <td>{task.title}</td>
                <td>{task.dueDate}</td>
                <td>
                  <button
                    className={styles["icon-button"]}
                    onClick={() => handleEdit(task)}
                  >
                    ✏️
                  </button>
                  <button
                    className={styles["icon-button"]}
                    onClick={() => handleDelete(task.uuid)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <TaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

interface TaskModalProps {
  task: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
}

function TaskModal({ task, onSave, onClose }: TaskModalProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !dueDate) {
      toast.error("Please fill in all fields!");
      return;
    }

    onSave({
      uuid: task?.uuid || "",
      title,
      description,
      dueDate,
      completed: task?.completed || false,
    });

    onClose();
  }

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal"]}>
        <h2>{task ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Due Date:
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </label>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
          >
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
