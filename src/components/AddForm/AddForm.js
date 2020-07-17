import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./AddForm.module.css";
import cx from "classnames";
import DatePicker from "react-datepicker";
// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export default class AddForm extends Component {
  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
  };

  state = {
    text: "",
    startDate: new Date(),
    showValidationError: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { text, startDate } = this.state;

    if (text.trim().length === 0) {
      this.setState({ showValidationError: true });
    } else {
      const { onAddTask } = this.props;

      const task = {
        text,
        fulldate: startDate,
      };
      onAddTask(task);

      this.setState({
        text: "",
        showValidationError: false,
        startDate: new Date(),
      });
    }
  };

  render() {
    const { text, showValidationError, startDate } = this.state;
    const inputSwitch = showValidationError
      ? styles.inputError
      : styles.inputSuccess;
    const btnSwitch = showValidationError && styles.btnError;

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
            className={cx(styles.input, inputSwitch)}
          />
          <button type="submit" className={cx(styles.btn, btnSwitch)}>
            Add Todo
          </button>
        </form>
        <div className={styles.dateContainer}>
          <span className={styles.span}>Set date</span>
          <div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={this.handleChangeDate}
              className={styles.dateInput}
            />
          </div>
        </div>
        {showValidationError && (
          <span className={styles.spanError}>Please, set a task!</span>
        )}
      </div>
    );
  }
}
