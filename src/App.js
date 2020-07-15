import "./App.css";
import shortid from "shortid";
import React, { Component } from "react";
import AddForm from "./components/AddForm";
import TodoList from "./components/TodoList";
import TaskFilter from "./components/TaskFilter";
import filterTasks from "./components/helpers/filterTasks";

export default class App extends Component {
  state = {
    tasks: [],
    sortDirectionNameAsc: true,
    sortDirectionDateAsc: true,
    filter: "",
    filtered: [],
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

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });

    const { tasks, filter } = this.state;
    const filtered = tasks.filter((task) =>
      task.text.toLowerCase().includes(filter.toLowerCase())
    );

    this.setState({ filtered });
  };

  addTask = (task) => {
    const date = new Date();
    const createdDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const taskToAdd = {
      ...task,
      id: shortid.generate(),
      date: createdDate,
      fulldate: date,
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

  sort = (e) => {
    let sort = e.target.name;
    console.log(sort);
    let sortingStart = [...this.state.tasks];
    const sorting = (sortingStart, sort) => {
      switch (sort) {
        case "nameAsc":
          return sortingStart.slice().sort((a, b) => {
            const nameA = a.text.toLowerCase();
            const nameB = b.text.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
        case "nameDsc":
          return sortingStart.slice().sort((a, b) => {
            const nameA = a.text.toLowerCase();
            const nameB = b.text.toLowerCase();
            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
            return 0;
          });
        case "dateAsc":
          return sortingStart.slice().sort((a, b) => {
            const dateA = a.fulldate;
            const dateB = b.fulldate;
            return new Date(dateB) - new Date(dateA);
          });
        case "dateDsc":
          return sortingStart.slice().sort((a, b) => {
            const dateA = a.fulldate;
            const dateB = b.fulldate;
            return new Date(dateA) - new Date(dateB);
          });
        default:
          return sortingStart;
      }
    };

    const sortingFinish = sorting(sortingStart, sort);

    return this.setState({ tasks: [...sortingFinish] });
  };

  sortDirectionChange = (e) => {
    const sort = e.target.name;
    if (sort === "nameAsc" || sort === "nameDsc") {
      this.setState((prevState) => ({
        sortDirectionNameAsc: !prevState.sortDirectionNameAsc,
      }));
    } else if (sort === "dateAsc" || sort === "dateDsc") {
      this.setState((prevState) => ({
        sortDirectionDateAsc: !prevState.sortDirectionDateAsc,
      }));
    }
  };

  filterTasks = (tasks, filter) => {
    const filtered = tasks.filter((task) =>
      task.text.toLowerCase().includes(filter.toLowerCase())
    );
    console.log(filtered);
  };

  render() {
    const {
      tasks,
      sortDirectionNameAsc,
      sortDirectionDateAsc,
      filter,
    } = this.state;
    // const filteredTasks = filterTasks(tasks, filter);
    this.filterTasks(tasks, filter);

    return (
      <>
        <AddForm onAddTask={this.addTask} />
        <div onClick={this.sortDirectionChange}>
          <button
            type="button"
            name={sortDirectionNameAsc ? "nameAsc" : "nameDsc"}
            onClick={this.sort}
          >
            {sortDirectionNameAsc ? "A-Z" : "Z-A"}
          </button>
          <button
            type="button"
            name={sortDirectionDateAsc ? "dateAsc" : "dateDsc"}
            onClick={this.sort}
          >
            {sortDirectionDateAsc ? "New-Old" : "Old-New"}
          </button>
          <button type="button" name="sortClear" onClick={this.sort}>
            Clear
          </button>
        </div>
        <TaskFilter value={filter} onChangeFilter={this.changeFilter} />
        <TodoList
          tasks={tasks}
          onDeleteTask={this.deleteTask}
          onUpateCompleted={this.updateCompleted}
        />
      </>
    );
  }
}
