import { apiFetch } from "./apiClient";

export const loginUser = async (credentials) => {
  const response = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};

export const registerUser = async (userData) => {
  const response = await apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
};
