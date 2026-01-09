const BASE_URL = "http://localhost:5000/api/tasks";
const AUTH_URL = "http://localhost:5000/api/auth";
const getAuthHeader = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token ? { "Authorization": `Bearer ${token}` } : {};
  }
  return {};
};

export const fetchTasks = async () => {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });
  
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create task");
  }

  return res.json();
};

export const updateTask = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update task");
  }

  return res.json();
};


export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });
  return res;
};
