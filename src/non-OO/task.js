const Task = (() => {
  return class Task {
    constructor(id, listId, description, priority) {
      this.id = id;
      this.listId = listId;
      this.description = description;
      this.priority = priority;
    }
  }
})()
