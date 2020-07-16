import React from "react";
import PropTypes from "prop-types";

const TodoList = ({ tasks, onUpateCompleted, onDeleteTask }) => (
  <div>
    <h1>Hello from TodoList</h1>
    <ul>
      {tasks &&
        tasks.map((task) => (
          <li key={task.id}>
            <p
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </p>
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

TodoList.propTypes = {
  onDeleteTask: PropTypes.func.isRequired,
  onUpateCompleted: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default TodoList;
