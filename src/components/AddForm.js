import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AddForm extends Component {
  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
  };

  state = {
    text: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAddTask({ ...this.state });

    this.setState({
      text: "",
    });
  };

  render() {
    const { text } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={this.handleChange}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}
