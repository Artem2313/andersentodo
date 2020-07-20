import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./SortForm.module.css";

export default class SortForm extends Component {
  static propTypes = {
    onSort: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    filtered: PropTypes.array.isRequired,
  };

  state = {
    sortDirectionNameAsc: true,
    sortDirectionDateAsc: true,
    firstFilter: null,
  };

  sort = (e) => {
    let sort = e.target.name;
    // let tasks = this.props.filtered;
    let sortingStart = [...this.props.filtered];
    this.setState((prevState) => ({
      firstFilter:
        prevState.firstFilter === null ? sortingStart : prevState.firstFilter,
    }));
    const { firstFilter } = this.state;
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
        case "sortClear":
          this.setState({ firstFilter: null });
          return firstFilter === null ? sortingStart : firstFilter;
        default:
          return sortingStart;
      }
    };

    const sortingFinish = sorting(sortingStart, sort);

    return this.props.onSort(sortingFinish);
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

  render() {
    const { sortDirectionNameAsc, sortDirectionDateAsc } = this.state;
    return (
      <div onClick={this.sortDirectionChange} className={styles.mainWrapper}>
        <span className={styles.title}>Sort Task</span>
        <div className={styles.btnContainer}>
          <button
            type="button"
            name={sortDirectionNameAsc ? "nameAsc" : "nameDsc"}
            onClick={this.sort}
            className={styles.btn}
          >
            {sortDirectionNameAsc ? "A-Z" : "Z-A"}
          </button>
          <button
            type="button"
            name={sortDirectionDateAsc ? "dateAsc" : "dateDsc"}
            onClick={this.sort}
            className={styles.btn}
          >
            {sortDirectionDateAsc ? "New-Old" : "Old-New"}
          </button>
          <button
            type="button"
            name="sortClear"
            onClick={this.sort}
            className={styles.btn}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}
