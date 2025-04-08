import React from 'react';

function TaskItem({ task, onDelete, onEdit }) {
  return (
    <div className="flex justify-between items-center p-2 border rounded shadow">
      <span>{task.task}</span>
      <div className="space-x-2">
        <button
          onClick={onEdit}
          className="text-yellow-500 hover:text-yellow-600 font-semibold"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-600 font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
