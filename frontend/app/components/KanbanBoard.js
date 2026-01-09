/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import TaskForm from "./TaskForm";
import ThemeToggle from "./ThemeToggle";
import { fetchTasks, createTask } from "../services/taskApi";
import { updateTask } from "../services/taskApi";
import { useAuth } from "../context/authContext";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error("Data is not an array:", data);
        setTasks([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
      setTasks([]); // Fallback to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    const newTask = await createTask(taskData);
    setTasks((prev) => [newTask, ...prev]);
  };
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };
  const handleUpdate = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // dropped outside
    if (!destination) return;

    // dropped in same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;

    try {
      // backend update
      const updatedTask = await updateTask(draggableId, {
        status: newStatus,
      });

      // frontend update
      setTasks((prev) =>
        prev.map((task) => (task._id === draggableId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Failed to update task status:", error);
      // Optional: revert state or show notification
    }
  };

  return (
    <div className="p-6 bg-board-bg max-h-screen rounded-xl shadow transition-all duration-300 animate-fade-in">
      {isModalOpen ? (
        <div className="animate-scale-in">
          <TaskForm onAdd={handleAddTask} onClose={() => setIsModalOpen(false)} />
        </div>
      ) : (
        <div className="flex justify-between items-center px-3 my-3 py-3 bg-header-bg rounded-xl border border-task-card-border shadow-sm animate-slide-in">
          <h2 className="text-2xl font-bold text-text-primary">
            {user?.name ? (
              <>
                <span className="animate-gradient-text capitalize">{user.name}</span>
                <span>&apos;s Board</span>
              </>
            ) : (
              "Kanban Board"
            )}
          </h2>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-300"
            >
              Add Task
            </button>
          </div>
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 max-h-screen ">
          <Column
            title="Todo"
            tasks={tasks.filter((task) => task.status === "Todo")}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            loading={loading}
          />
          <Column
            title="In Progress"
            tasks={tasks.filter((task) => task.status === "In Progress")}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            loading={loading}
          />
          <Column
            title="Done"
            tasks={tasks.filter((task) => task.status === "Done")}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            loading={loading}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
