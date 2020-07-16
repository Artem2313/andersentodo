import "./App.css";
import shortid from "shortid";
import React, { Component } from "react";
import AddForm from "./components/AddForm";
import TodoList from "./components/TodoList";
import TaskFilter from "./components/TaskFilter";
import DateFilter from "./components/DateFilter";
import SortForm from "./components/SortForm";

export default class App extends Component {
  state = {
    tasks: [],
    filtered: [],
  };

  componentDidMount() {
    const persistedTasks = localStorage.getItem("tasks");

    if (persistedTasks) {
      const tasks = JSON.parse(persistedTasks);

      this.setState({ tasks, filtered: tasks });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;
    if (prevState.tasks !== tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.setState({ filtered: tasks });
    }
  }

  // Добавление таски
  addTask = (task) => {
    const date = new Date();
    const createdDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const taskToAdd = {
      ...task,
      id: shortid.generate(),
      date: createdDate,
      fulldate: date,
      completed: false,
    };

    this.setState((prevState) => ({
      tasks: [taskToAdd, ...prevState.tasks],
    }));
  };

  // Удаление таски
  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  // Изменение в зависимости выполнена или нет таска

  updateCompleted = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  // Фильтрация (для фильтрации по дате использовал react-datepicker)

  changeFilter = (filter) => {
    const { tasks } = this.state;

    let filtered;

    if (typeof filter === "object") {
      filtered = tasks.filter((task) => {
        const newDateFromTask = new Date(task.fulldate);
        const newDateFromFilter = new Date(filter);
        const checkDateTask = `${newDateFromTask.getDate()}/${
          newDateFromTask.getMonth() + 1
        }/${newDateFromTask.getFullYear()}`;
        const checkDateFilter = `${newDateFromFilter.getDate()}/${
          newDateFromFilter.getMonth() + 1
        }/${newDateFromFilter.getFullYear()}`;

        return checkDateTask === checkDateFilter;
      });
    } else if (typeof filter === "string") {
      filtered = tasks.filter((task) =>
        task.text.toLowerCase().includes(filter.toLowerCase())
      );
    }

    this.setState({
      filtered,
    });
  };

  // Сортировка

  sort = (sorted) => {
    return this.setState({ filtered: [...sorted] });
  };

  render() {
    const { filtered, tasks } = this.state;

    return (
      <>
        <AddForm onAddTask={this.addTask} />
        <SortForm filtered={filtered} tasks={tasks} onSort={this.sort} />
        <TaskFilter onChangeFilter={this.changeFilter} />
        <DateFilter onChange={this.changeFilter} />
        <TodoList
          tasks={filtered}
          onDeleteTask={this.deleteTask}
          onUpateCompleted={this.updateCompleted}
        />
      </>
    );
  }
}
