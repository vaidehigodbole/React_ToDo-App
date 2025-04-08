import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://67f50300913986b16fa2cef6.mockapi.io/api/v1/todos";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return;
    await axios.post(API_URL, { text: task, completed: false });
    setTask("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  const toggleComplete = async (id, completed) => {
    await axios.put(`${API_URL}/${id}`, { completed: !completed });
    fetchTodos();
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    return !todo.completed;
  });

  const pendingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="container">
      <h1> TaskTide – Your daily task buddy </h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={filter === "pending" ? "active" : ""}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li>No tasks found.</li>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <span onClick={() => toggleComplete(todo.id, todo.completed)}>
                {todo.text}
              </span>
              <div className="task-buttons">
                <button onClick={() => toggleComplete(todo.id, todo.completed)}>
                  ✅
                </button>
                <button onClick={() => deleteTodo(todo.id)}>❌</button>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="pending-count">Pending tasks: {pendingCount}</div>
    </div>
  );
}

export default App;
