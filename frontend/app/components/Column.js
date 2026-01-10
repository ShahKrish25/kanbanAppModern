import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const Column = ({ title, tasks, onDelete, onUpdate, loading }) => {
  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex-1 bg-column-bg/40 backdrop-blur-md rounded-xl shadow p-4 h-[calc(100vh-22rem)] overflow-y-auto no-scrollbar transition-all duration-500 animate-fade-in hover:shadow-md border border-transparent hover:border-task-card-border/30"
        > 
          <div className="flex justify-between items-center mx-2 relative">
            <h2 className="text-xl font-semibold mb-4 text-text-primary">{title}</h2>
            <h5 className="text-sm text-task-count mb-2">
              {tasks.length > 1
                ? `${tasks.length} tasks`
                : `${tasks.length} task`}
            </h5>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text-primary"></div>
            </div>
          ) : tasks.length === 0 ? (
            <p className="relative transform -translate-y-1/2 top-1/2 text-center text-text-secondary">
              No tasks in this column
            </p>
          ) : (
            tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
