const filterTasks = (tasks, filter) => {
  return tasks.filter((task) =>
    task.text.toLowerCase().includes(filter.toLowerCase())
  );
};

export default filterTasks;
