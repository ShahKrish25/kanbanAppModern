/* eslint-disable react-hooks/refs */
"use client"
import { updateTask, deleteTask } from "../services/taskApi";
import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, onDelete, onUpdate, index }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleDelete = async (id) => {
    try {
      const res = await deleteTask(id);
      if(res.ok) { // Check for ok (status 200-299)
        onDelete(id);
      } else {
        console.error("Failed to delete task:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const updatedTask = await updateTask(task._id, editedTask);
      // Notify parent component about the update
      if(updatedTask) {
        onUpdate(updatedTask);
      }
      setIsEditing(false);  
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const handleClose = () =>{
    setIsEditing(false);
  }


  return (
    <>
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
      <div className={`relative bg-task-card border-task-card-border border p-4 rounded-lg mb-3 shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-task-card-hover transition-all duration-300 animate-scale-in ${isEditing ? 'min-h-fit' : 'min-h-[80px]'}`}  
        ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-3 dark:bg-gray-800 text-text-primary dark:border-gray-600"
            />
            <textarea
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-3 dark:bg-gray-800 text-text-primary dark:border-gray-600"
            />
            <button
              onClick={handleSaveClick}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer active:scale-95 transition-all duration-200"
            >
              Save
            </button>
            <button
              onClick={handleClose}
              className=" mx-2 bg-gray-600 text-white px-4 py-2 rounded active:scale-95 hover:bg-gray-700 cursor-pointer transition-all duration-200"
            >
              Clear
            </button>
          </>
        ) : (
          <div className="flex flex-col h-full">  
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary wrap-break-word">{editedTask.title}</h3>
              {editedTask.description && (
                <p className="text-sm text-text-secondary mt-2 line-clamp-3 overflow-hidden text-ellipsis wrap-break-word">
                  {editedTask.description}
                </p>
              )}
            </div>
            
            <div className="mt-4 pt-3 border-t border-task-card-border/50 flex justify-end gap-2">
              <button 
                className="px-4 py-1.5 text-xs font-bold bg-blue-500 opacity-90 text-white rounded-lg active:scale-95 transition-all duration-200 cursor-pointer hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30" 
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button 
                className="px-4 py-1.5 text-xs font-bold opacity-90 bg-red-500 text-white rounded-lg active:scale-95 cursor-pointer transition-all duration-200 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30" 
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      )}
    </Draggable>
    </>
  );
};

export default TaskCard;
