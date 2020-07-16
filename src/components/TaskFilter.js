import React, { Component } from "react";
import PropTypes from "prop-types";

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
      <div>
        <input
          type="text"
          value={filter}
          onChange={this.handleChange}
          placeholder="Type to filter tasks..."
        />
      </div>
    );
  }
}
