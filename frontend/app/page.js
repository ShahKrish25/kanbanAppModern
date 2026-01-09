/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import KanbanBoard from "./components/KanbanBoard";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/authContext";

const Page = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-board-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? (
    <div className="p-6 min-h-screen bg-board-bg transition-all duration-200">
    <Navbar />
      <KanbanBoard />
    </div>
  ) : null;
};

export default Page;
