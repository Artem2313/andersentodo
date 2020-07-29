import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./AddForm.module.css";
import cx from "classnames";
import shortid from "shortid";

export default class AddForm extends Component {
  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
  };

  state = {
    text: "",
    date: "",
    showValidationError: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { text, date } = this.state;

    if (date === "") {
      this.setState({
        showValidationError: "Please, set date",
      });
      return;
    }

    if (text.trim().length === 0) {
      this.setState({
        showValidationError: "Please, enter task",
      });
      return;
    }

    const task = {
      text,
      date,
      completed: false,
      id: shortid.generate(),
    };

    this.props.onAddTask(task);

    this.setState({
      text: "",
      showValidationError: "",
      date: "",
    });
  };

  render() {
    const { text, showValidationError, date } = this.state;
    const inputSwitch = showValidationError
      ? styles.inputError
      : styles.inputSuccess;
    const btnSwitch = showValidationError && styles.btnError;

    const textInput = cx(styles.input, inputSwitch);
    const addBtn = cx(styles.btn, btnSwitch);

    return (
      <div className={styles.mainWrapper}>
        <h2 className={styles.title}>Add task</h2>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={this.handleChange}
            placeholder="Write task"
            className={textInput}
          />
          <button type="submit" className={addBtn}>
            Add Todo
          </button>
        </form>
        <div className={styles.dateContainer}>
          <span className={styles.span}>Set date</span>
          <input
            type="date"
            name="date"
            value={date}
            onChange={this.handleChange}
            styles={styles.dateInput}
          />
        </div>
        {showValidationError && (
          <span className={styles.spanError}>{showValidationError}</span>
        )}
      </div>
    );
  }
}
