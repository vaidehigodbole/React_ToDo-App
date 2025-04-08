import React from "react";

const TodoItem = ({
  task,
  editingId,
  editedTask,
  setEditedTask,
  deleteTask,
  startEditing,
  saveEditedTask,
}) => {
  return (
    <li className="todo-item">
      {editingId === task.id ? (
        <>
          <input
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button onClick={() => saveEditedTask(task.id)}>Save</button>
        </>
      ) : (
        <>
          <span>{task.text}</span>
          <div className="actions">
            <button onClick={() => startEditing(task.id, task.text)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
