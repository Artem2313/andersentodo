import React from "react";
import PropTypes from "prop-types";
import styles from "./TodoLis.module.css";
import cx from "classnames";

const TodoList = ({ tasks, onUpateCompleted, onDeleteTask }) => (
  <div className={styles.mainWrapper}>
    <h2 className={styles.title}>Hello from TodoList</h2>
    <ul className={styles.list}>
      <li className={cx(styles.listItem, styles.firstLine)}>
        <div>
          <p>Task Name</p>
        </div>
        <div>
          <p>Task Date</p>
        </div>
        <div>
          <p>Task Status</p>
        </div>
        <div>
          <p>Delete Task</p>
        </div>
      </li>
      {tasks &&
        tasks.map((task) => (
          <li key={task.id} className={styles.listItem}>
            <div>
              <p
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </p>
            </div>
            <div>
              <p>{task.date}</p>
            </div>
            <div>
              <label>
                Completed:
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onUpateCompleted(task.id)}
                />
              </label>
            </div>
            <div>
              <button
                type="button"
                className={styles.btn}
                onClick={() => onDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
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
