/*jshint esversion: 6 */
/*
list is responsible for creating a single list component
*/
const List = (() => {
  // let id = 1;
  return class List {
    constructor(title, id, tasks) {
      this.title = title;
      this.id = id;
      this.tasks = tasks;

      this.taskForm = document.getElementById('create-task-form');
      this.taskForm.style.display = 'block';

      this.renderDropDown();
      this.renderListBox();
      this.displayTaskInListBox(tasks)
      // this.getExistingTasks();
    }

    renderDropDown() {
      const parentList = document.getElementById('parent-list');
      const option = document.createElement('option');
      option.value = this.id;
      option.text = this.title;
      parentList.appendChild(option);
    }

    renderListBox() {
      const listsContainer = document.getElementById('lists');
      let boxHtml = `
      <div class="list">
        <h2><button data-id="${this.id}" class="delete-list">X</button>${this.title}</h2>
        <ul id="${this.id}"></ul>
      </div>`;
      listsContainer.innerHTML += boxHtml;
    }

    displayTaskInListBox(tasks) {
      const listUl = document.getElementById(this.id);
      for(let i = 0; i < tasks.length; i++) {
        let task = new Task(tasks[i].description, tasks[i].priority, tasks[i].id)
        const taskHtml = task.renderTask();
        listUl.innerHTML += taskHtml;
      }
      return listUl;
    }

  };
})();
