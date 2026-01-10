import { apiFetch } from "./apiClient";

export const fetchTasks = async () => {
  const res = await apiFetch("/tasks");
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch tasks");
  }
  return res.json();
};

export const createTask = async (task) => {
  const res = await apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create task");
  }

  return res.json();
};

export const updateTask = async (id, updates) => {
  const res = await apiFetch(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update task");
  }

  return res.json();
};

export const deleteTask = async (id) => {
  const res = await apiFetch(`/tasks/${id}`, {
    method: "DELETE",
  });
  return res;
};
