import { useState } from "react";

const TaskForm = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd({ title, description });

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-column-bg p-4 rounded-xl shadow-lg mb-6 transition-all duration-300 border border-task-card-border"
    >
      <h3 className="font-semibold mb-3 text-text-primary">Add New Task</h3>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3 bg-task-card text-text-primary border-task-card-border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3 bg-task-card text-text-primary border-task-card-border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      />
      <div className="flex justify-end items-center gap-3 transition-all duration-200">
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md"
      >
        Add Task
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition-all shadow-md"
      >
        Close
      </button>
      </div>
    </form>
  );
};

export default TaskForm;
