/*jshint esversion: 6 */

// document.addEventListener("DOMContentLoaded", function() {
//   let app = new App();
//   app.addEventListeners();
//   app.fetchBooks();
// });

const store = {tasks: [], lists: []};
document.addEventListener('DOMContentLoaded', () => {
  console.log('The DOM content has loaded');
  addList();
});

function addList() {
  const listForm = document.getElementById('create-list-form');
  listForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let newListTitle = e.target[0].value;
    const newList = new List(newListTitle);
    addToDropDown(newList);
    listForm.reset();
  });
}

function addToDropDown(list) {
  const parentList = document.getElementById('parent-list');
  const newOption = document.createElement('option');
  newOption.value = list.id;
  newOption.text = list.title;
  parentList.appendChild(newOption);
  addTask();
}

function addTask() {
  const taskForm = document.getElementById('create-task-form');
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const listInput = e.target[0].value;
    const parentList = store.lists.find((list) => {
      return list.id === parseInt(listInput);
    });
    let newTaskDes = e.target[1].value;
    let newTaskPri = e.target[2].value;
    const newTask = new Task(newTaskDes, newTaskPri, parentList);
    findOrCreateListBox(newTask);
    taskForm.reset();
  });
}

function findOrCreateListBox(task) {
  const parentList = task.list();
  const listUl = document.getElementById(parentList.id);
  if (!listUl) {
    createListBox(parentList);
  }
  displayTaskInListBox(task);
}

function createListBox(list) {
  const listContainer = document.getElementById('lists');
  let boxHtml = `
  <div class="list">
    <h2><button data-id="${list.id}" class="delete-list">X</button>${list.title}</h2>
    <ul id="${list.id}">
    </ul>
  </div>`;
  listContainer.innerHTML += boxHtml;
}

function displayTaskInListBox(task) {
  const parentList = task.list();
  const listUl = document.getElementById(parentList.id);
  let listHtml = `
    <li>${task.description}
    <br>${task.priority}
    </li>`;
  listUl.innerHTML += listHtml;
}
