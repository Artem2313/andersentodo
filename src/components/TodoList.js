import React from "react";

const TodoList = ({ tasks }) => (
  <div>
    <h1>Hello from TodoList</h1>
    <ul>
      {tasks &&
        tasks.map((task) => (
          <li key={task.id}>
            <p>{task.text}</p>
            <p>{task.date}</p>
          </li>
        ))}
    </ul>
  </div>
);

export default TodoList;
