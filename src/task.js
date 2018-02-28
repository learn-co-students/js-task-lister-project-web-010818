/*
task is responsible for creating a single task object
*/


const Task = (() => {
  return class Task {
    constructor(json, listId) {
      this.description = json.description;
      this.priority = json.priority;
      this.id = json.id;
      this.listId = listId;


      this.addTaskToList();

    }

    addTaskToList() {
      console.log(this)
      let list = document.getElementById(`list-${this.listId}`)
      let li = document.createElement('li');
      li.innerHTML = `Task: ${this.description}<br>Priority: ${this.priority}`
      list.appendChild(li)
    }

    static all() {
      return taskStore
    }
  }



})()
