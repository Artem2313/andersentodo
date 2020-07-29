import React from "react";
import PropTypes from "prop-types";
import styles from "./DateFilter.module.css";

export default class DateFilter extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  state = {
    date: "",
  };

  handleChange = (e) => {
    const date = e.target.value;
    const { onChange } = this.props;
    onChange(date);
    this.setState({
      date,
    });
  };

  render() {
    const { date } = this.state;
    return (
      <div className={styles.mainWrapper}>
        <span className={styles.title}>Filter by Date</span>
        <div>
          <input
            type="date"
            name="date"
            value={date}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
