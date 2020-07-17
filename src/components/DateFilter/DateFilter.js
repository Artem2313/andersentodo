import React from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import styles from "./DateFilter.module.css";

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
      <div className={styles.mainWrapper}>
        <span className={styles.title}>Filter by Date</span>
        <div>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={this.state.startDate}
            onChange={this.handleChange}
            className={styles.input}
          />
        </div>
      </div>
    );
  }
}
