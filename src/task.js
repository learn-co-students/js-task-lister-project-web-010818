/*jshint esversion: 6 */
let taskId = 0;
class Task {
  constructor(description, priority, list) {
    this.description = description;
    this.priority = priority;
    this.id = ++taskId;
    this.listId = list.id;
    store.tasks.push(this);
  }

  list() {
    return store.lists.find((list) => {
      return list.id === this.listId;
    });
  }
}
