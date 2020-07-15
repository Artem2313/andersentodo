import React from "react";
import PropTypes from "prop-types";

const TaskFilter = ({ value, onChangeFilter, onFilter }) => (
  <input
    type="text"
    value={value}
    onChange={onChangeFilter}
    placeholder="Type to filter tasks..."
  />
);

TaskFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default TaskFilter;
