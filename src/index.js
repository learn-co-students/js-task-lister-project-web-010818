const store = {tasks:[], lists: []}

document.addEventListener('DOMContentLoaded', () => {
  console.log("The DOM content has loaded");
  addList();
});


function addList() {
  const listForm = document.getElementById('create-list-form');
  listForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let input = e.target[0].value;
    new List(input);
    showSelectList();
  });
}

function showSelectList() {
  const box = document.getElementById('new-list-title');
  box.value = ''
  let parentList = document.getElementById('parent-list');
  parentList.innerHTML = ""
  store.lists.forEach((list) => {
    let option = document.createElement('option');
    option.value = list.id;
    option.text = list.title;
    parentList.appendChild(option);
  })
}

addTask();
function addTask() {
  let taskForm = document.getElementById('create-task-form');
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let listId = e.target[0].value;
    let list = store.lists.find((list) => {
      return list.id === parseInt(listId);
    })
    let description = e.target[1].value;
    let priority = e.target[2].value;
    let task = new Task(description, priority, list);

    checkExistence(list, task);
  });
}

function checkExistence(list, task) {
  const listUl = document.getElementById(`${list.id}`)
  if (listUl) {
    return addTaskToExistingList(list, task)
  } else {
    return addNewListBox(list, task)
  }
}

function addTaskToExistingList(list, task) {
  const listUl = document.getElementById(`${list.id}`)
  let listHtml = `
    <li>${task.description}
    <br>${task.priority}
    </li>`
  listUl.innerHTML += listHtml;
}

function addNewListBox(list, task) {
  const listContainer = document.getElementById('lists');
  let boxHtml = `
  <div class="list">
    <h2><button data-id="${list.id}" class="delete-list">X</button>${list.title}</h2>
    <ul id="${list.id}">
      <li>${task.description}
      <br>${task.priority}</li>
    </ul>
  </div>`
  listContainer.innerHTML += boxHtml;
}
