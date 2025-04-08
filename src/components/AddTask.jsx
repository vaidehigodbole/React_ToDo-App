import React, { useState, useEffect } from 'react';

function AddTask({ onAdd, editingTask, onUpdate }) {
  const [task, setTask] = useState('');

  useEffect(() => {
    if (editingTask) setTask(editingTask.task);
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    if (editingTask) {
      onUpdate({ ...editingTask, task });
    } else {
      onAdd({ task });
    }
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border p-2 flex-grow rounded"
        type="text"
        value={task}
        placeholder="Enter task..."
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editingTask ? 'Update' : 'Add'}
      </button>
    </form>
  );
}

export default AddTask;
