import "./App.css";
import shortid from "shortid";
import React, { Component } from "react";
import AddForm from "./components/AddForm";
import TodoList from "./components/TodoList";

export default class App extends Component {
  state = {
    tasks: [
      { id: 1, text: "hello", date: "23/11/1992", completed: false },
      { id: 2, text: "world", date: "20/10/2003", completed: false },
      { id: 3, text: "my", date: "21/12/2002", completed: false },
    ],
  };

  addTask = (task) => {
    const date = new Date();
    const createdDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const taskToAdd = {
      ...task,
      id: shortid.generate(),
      date: createdDate,
      completed: false,
    };

    this.setState((state) => ({
      tasks: [...state.tasks, taskToAdd],
    }));
  };

  render() {
    const { tasks } = this.state;
    return (
      <>
        <AddForm onAddTask={this.addTask} />
        <TodoList tasks={tasks} />
      </>
    );
  }
}
