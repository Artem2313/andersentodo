import styles from "./App.module.css";
import React, { Component } from "react";
import AddForm from "./components/AddForm/AddForm";
import TodoList from "./components/TodoList/TodoList";
import TaskFilter from "./components/TaskFilter/TaskFilter";
import DateFilter from "./components/DateFilter/DateFilter";
import SortForm from "./components/SortForm/SortForm";
import {
  filteredByDate,
  filteredByName,
  sortedArray,
} from "./components/helpers/helpers";

export default class App extends Component {
  state = {
    tasks: [],
    filterDate: "",
    filterName: "",
    sortBy: "",
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

  // Добавление таски
  addTask = (task) => {
    // Новая таска
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, task],
    }));
  };

  // Удаление таски
  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  // Изменение в зависимости выполнена или нет таска.

  updateCompleted = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  // Фильтрация (для фильтрации по дате использовал react-datepicker)

  changeFilter = (filter) => {
    if (typeof filter === "object") {
      this.setState({
        filterDate: new Date(filter),
      });
    }

    if (typeof filter === "string") {
      this.setState({
        filterName: filter,
      });
    }
  };

  // Сортировка

  sort = (sorted) => {
    return this.setState({ sortBy: sorted });
  };

  render() {
    const { tasks, filterDate, filterName, sortBy } = this.state;
    const filteredByDateTasks = filteredByDate(tasks, filterDate);
    const filteredByNameTasks = filteredByName(filteredByDateTasks, filterName);
    const sortedTasks = sortedArray(filteredByNameTasks, sortBy);

    return (
      <div className={styles.mainWrapper}>
        <h1 className={styles.title}>Todo App</h1>
        <AddForm onAddTask={this.addTask} />
        <SortForm onSort={this.sort} />
        <TaskFilter onChangeFilter={this.changeFilter} />
        <DateFilter onChange={this.changeFilter} />
        <TodoList
          tasks={sortedTasks}
          onDeleteTask={this.deleteTask}
          onUpateCompleted={this.updateCompleted}
        />
      </div>
    );
  }
}
