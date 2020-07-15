import React from "react";

const TodoList = ({ tasks, onUpateCompleted, onDeleteTask }) => (
  <div>
    <h1>Hello from TodoList</h1>
    <ul>
      {tasks &&
        tasks.map((task) => (
          <li key={task.id}>
            <p>{task.text}</p>
            <p>{task.date}</p>
            <label>
              Completed:
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onUpateCompleted(task.id)}
              />
            </label>
            <button type="button" onClick={() => onDeleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
    </ul>
  </div>
);

export default TodoList;
