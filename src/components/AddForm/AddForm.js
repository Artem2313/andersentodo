import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./AddForm.module.css";
import cx from "classnames";

export default class AddForm extends Component {
  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
  };

  state = {
    text: "",
    showValidationError: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { text } = this.state;

    if (text.trim().length === 0) {
      this.setState({ showValidationError: true });
    } else {
      const { onAddTask } = this.props;
      onAddTask({ text });

      this.setState({
        text: "",
        showValidationError: false,
      });
    }
  };

  render() {
    const { text, showValidationError } = this.state;
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
            className={cx(styles.input, inputSwitch)}
          />
          <button type="submit" className={cx(styles.btn, btnSwitch)}>
            Add Todo
          </button>
        </form>
        {showValidationError && (
          <span className={styles.spanError}>Please, set a task!</span>
        )}
      </div>
    );
  }
}
