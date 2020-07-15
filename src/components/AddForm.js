import React, { Component } from "react";
import PropTypes from "prop-types";

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
      this.props.onAddTask({ text });

      this.setState({
        text: "",
        showValidationError: false,
      });
    }
  };

  render() {
    const { text, showValidationError } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={this.handleChange}
            style={{
              borderColor: showValidationError ? "red" : "blue",
            }}
          />
          <button type="submit">Add Todo</button>
          {showValidationError && (
            <p style={{ color: "red" }}>Please, set a task!</p>
          )}
        </form>
      </div>
    );
  }
}
