/*jshint esversion: 6 */

const store = {tasks: [], lists: []};
const createTaskForm = document.getElementById('create-task-form');
createTaskForm.style.display = 'none';

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
  createTaskForm.style.display = 'block';
  const parentList = document.getElementById('parent-list');
  const newOption = document.createElement('option');
  newOption.value = list.id;
  newOption.text = list.title;
  parentList.appendChild(newOption);
  addTask();
}

function addTask() {
  createTaskForm.addEventListener('submit', (e) => {
    console.log('clicked')
    e.preventDefault();
    const listInput = e.target[0].value;
    const parentList = store.lists.find((list) => {
      return list.id === parseInt(listInput);
    });
    let newTaskDes = e.target[1].value;
    let newTaskPri = e.target[2].value;
    const newTask = new Task(newTaskDes, newTaskPri, parentList);
    findOrCreateListBox(newTask);
    createTaskForm.reset();
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
  const listsContainer = document.getElementById('lists');
  let boxHtml = `
  <div class="list">
    <h2><button data-id="${list.id}" class="delete-list">X</button>${list.title}</h2>
    <ul id="${list.id}"></ul>
  </div>`;
  listsContainer.innerHTML += boxHtml;
  deleteListBox(list);
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

function deleteListBox(list) {
  const listsContainer = document.getElementById('lists');
  listsContainer.addEventListener('click', (e) => {
    if (e.target.className === 'delete-list') {
      const listBoxDiv = e.target.parentElement.parentElement;
      listsContainer.removeChild(listBoxDiv);
    }
  });
}
