import React from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export default class DateFilter extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  state = {
    startDate: new Date(),
  };

  handleChange = (date) => {
    const { onChange } = this.props;
    onChange(date);
    this.setState({
      startDate: date,
    });
  };

  render() {
    return (
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}
