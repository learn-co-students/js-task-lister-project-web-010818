/*
task is responsible for creating a single task object
*/
const Task = (() => {
  let id = 1
  return class Task {
    constructor(description, priority, list) {
      this.description = description;
      this.priority = priority;
      this.id = id++;
      this.listId = list.id;
      store.tasks.push(this);
    }

    list() {
      return store.lists.find((list) => {
        return list.id === this.listId;
      })
    }
  }

})()
