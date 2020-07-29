import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./TaskFilter.module.css";

export default class TaskFilter extends Component {
  static propTypes = {
    onChangeFilter: PropTypes.func.isRequired,
  };

  state = {
    filter: "",
  };

  handleChange = (e) => {
    this.setState({
      filter: e.target.value,
    });
    this.props.onChangeFilter(e.target.value);
  };
  render() {
    const { filter } = this.state;
    return (
      <div className={styles.mainWrapper}>
        <span className={styles.title}>Filter Task By Name</span>
        <input
          type="text"
          value={filter}
          onChange={this.handleChange}
          placeholder="Type to filter tasks..."
          className={styles.input}
        />
      </div>
    );
  }
}
