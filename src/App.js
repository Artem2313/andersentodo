import styles from "./App.module.css";
import shortid from "shortid";
import React, { Component } from "react";
import AddForm from "./components/AddForm/AddForm";
import TodoList from "./components/TodoList/TodoList";
import TaskFilter from "./components/TaskFilter/TaskFilter";
import DateFilter from "./components/DateFilter/DateFilter";
import SortForm from "./components/SortForm/SortForm";

export default class App extends Component {
  state = {
    tasks: [],
    filtered: [],
    filteredByDate: null,
    filteredByName: "",
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
    const fulldate = new Date(task.fulldate);

    const createdDate = `${fulldate.getDate()}/${
      fulldate.getMonth() + 1
    }/${fulldate.getFullYear()}`;

    const taskToAdd = {
      ...task,
      id: shortid.generate(),
      date: createdDate,
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
    const { tasks, filteredByDate, filteredByName } = this.state;

    let filtered;

    if (typeof filter === "object") {
      this.setState({
        filteredByDate: new Date(filter),
      });
    }

    if (typeof filter === "string") {
      this.setState({
        filteredByName: filter,
      });
    }

    let filterDate = typeof filter === "object" ? filter : filteredByDate;

    filtered = tasks.filter((task) => {
      if (filterDate === null) {
        return task;
      } else {
        const newDateFromTask = new Date(task.fulldate);
        const newDateFromFilter = new Date(filterDate);
        const checkDateTask = `${newDateFromTask.getDate()}/${
          newDateFromTask.getMonth() + 1
        }/${newDateFromTask.getFullYear()}`;
        const checkDateFilter = `${newDateFromFilter.getDate()}/${
          newDateFromFilter.getMonth() + 1
        }/${newDateFromFilter.getFullYear()}`;

        return checkDateTask === checkDateFilter;
      }
    });

    let filterName = typeof filter === "string" ? filter : filteredByName;

    filtered = filtered.filter((task) =>
      task.text.toLowerCase().includes(filterName.toLowerCase())
    );

    this.setState({
      filtered,
    });
  };

  // Сортировка

  sort = (sorted) => {
    return this.setState({ filtered: [...sorted] });
  };

  // Show all tasks

  showAllTasks = (e) => {
    console.log(e.target.name);
    const { tasks } = this.state;
    this.setState({ filtered: tasks });
  };

  render() {
    const { filtered, tasks, showAll } = this.state;

    return (
      <div className={styles.mainWrapper}>
        <h1 className={styles.title}>Todo App</h1>
        <AddForm onAddTask={this.addTask} />
        <SortForm filtered={filtered} tasks={tasks} onSort={this.sort} />
        <TaskFilter showAll={showAll} onChangeFilter={this.changeFilter} />
        <DateFilter onChange={this.changeFilter} />
        <TodoList
          tasks={filtered}
          onDeleteTask={this.deleteTask}
          onUpateCompleted={this.updateCompleted}
        />
      </div>
    );
  }
}
