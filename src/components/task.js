const Task = (() => {
  return class Task {
    constructor(id, description, priority) {
      this.id = id;
      this.description = description;
      this.priority = priority;
    }

    render() {
      return `<li>Task: ${this.description} <br> Priority: ${this.priority}</li>`
    }
  }
})()
