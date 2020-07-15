import "./App.css";
import shortid from "shortid";
import React, { Component } from "react";
import AddForm from "./components/AddForm";
import TodoList from "./components/TodoList";

export default class App extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    const persistedTasks = localStorage.getItem("tasks");

    if (persistedTasks) {
      const tasks = JSON.parse(persistedTasks);

      this.setState({ tasks });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;
    if (prevState.tasks !== tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  addTask = (task) => {
    const date = new Date();
    const createdDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const taskToAdd = {
      ...task,
      id: shortid.generate(),
      date: createdDate,
      completed: false,
    };

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, taskToAdd],
    }));
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  updateCompleted = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  render() {
    const { tasks } = this.state;
    return (
      <>
        <AddForm onAddTask={this.addTask} />
        <TodoList
          tasks={tasks}
          onDeleteTask={this.deleteTask}
          onUpateCompleted={this.updateCompleted}
        />
      </>
    );
  }
}
