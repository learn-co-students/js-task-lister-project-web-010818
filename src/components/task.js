/*jshint esversion: 6 */
/*
task is responsible for creating a single task object
*/
const Task = (() => {
  let id = 1;
  return class Task {
    constructor(description, priority) {
      this.description = description;
      this.priority = priority;
      this.id = id++;
      this.renderTask();
    }

    renderTask() {
      return (`<li>${this.description}
        <br>${this.priority}
        </li>`
      );
    }

  };
})();
