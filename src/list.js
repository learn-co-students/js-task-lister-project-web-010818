/*jshint esversion: 6 */

let classId = 0;
class List {
  constructor(title) {
    this.title = title;
    this.id = ++classId;
    store.lists.push(this);
  }

  tasks() {
    return store.tasks.filter((task) => {
      return task.listId === this.id;
    });
  }
}
