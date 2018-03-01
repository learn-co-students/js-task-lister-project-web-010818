/*jshint esversion: 6 */
/*
list is responsible for creating a single list component
*/
const List = (() => {
  let id = 1;
  return class List {
    constructor(title) {
      this.id = id++;
      this.title = title;
      this.tasks =[];

      this.taskForm = document.getElementById('create-task-form');
      this.taskForm.style.display = 'block';

      this.renderDropDown();
      this.renderNewListBox();
      // this.getExistingTasks();
    }

    renderDropDown() {
      const parentList = document.getElementById('parent-list');
      const option = document.createElement('option');
      option.value = this.id;
      option.text = this.title;
      parentList.appendChild(option);
    }

    renderNewListBox() {
      const listsContainer = document.getElementById('lists');
      let boxHtml = `
      <div class="list">
        <h2><button data-id="${this.id}" class="delete-list">X</button>${this.title}</h2>
        <ul id="${this.id}"></ul>
      </div>`;
      listsContainer.innerHTML += boxHtml;
      // this.listenForDelete();
    }

    displayTaskInListBox(task) {
      const listUl = document.getElementById(this.id);
      const taskHtml = task.renderTask();
      listUl.innerHTML += taskHtml;
      return listUl;
    }

  };
})();
