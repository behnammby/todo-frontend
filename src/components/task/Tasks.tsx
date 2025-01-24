import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { Task } from "../../types/task";
import { Header } from "../layout/Header";
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";
import { SortOrder } from "../../types/sort.order";

export default function Tasks() {
  const { tasks } = useTasks();
  const [sort, setSort] = useState<SortOrder>("desc");

  const sortedTasks = sortTasks(tasks, sort);

  function handleSortClick() {
    if (sort === "asc") {
      setSort("desc");
    } else {
      setSort("asc");
    }
  }

  return (
    <>
      <div className="flex flex-col max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <Header sort={sort} onSort={handleSortClick} />
        <TaskForm />
        <TasksList tasks={sortedTasks} />
      </div>
    </>
  );
}

function sortTasksDesc(tasks: Task[]) {
  // Tasks is a state variable and should be immutable
  // So we create a copy of tasks and then sort
  // Since sort function mutates the array
  const sortedTasks = tasks.slice().sort((a, b) => {
    if (a.dueDate < b.dueDate) {
      return 1;
    }

    if (a.dueDate > b.dueDate) {
      return -1;
    }

    return 0;
  });

  return sortedTasks;
}

function sortTasks(tasks: Task[], sort: SortOrder) {
  if (sort === "desc") {
    return sortTasksDesc(tasks);
  }

  return sortTasksAsc(tasks);
}

function sortTasksAsc(tasks: Task[]) {
  const sortedTasks = tasks.slice().sort((a, b) => {
    if (a.dueDate < b.dueDate) {
      return -1;
    }

    if (a.dueDate > b.dueDate) {
      return 1;
    }

    return 0;
  });

  return sortedTasks;
}
