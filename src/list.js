/*
list is responsible for creating a single list component
*/
const List = (() => {
  let id = 1;
  return class List {
    constructor(title) {
      this.title = title;
      this.id = id++;
      store.lists.push(this)
    }

    tasks() {
      return store.tasks.filter((task) => {
        return task.listId = this.id;
      })
    }




  }
})()
