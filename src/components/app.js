/*jshint esversion: 6 */
class App {
  constructor() {
    this.lists = [];
    this.taskForm = document.getElementById('create-task-form');
    this.taskForm.style.display = 'none';
    this.baseUrl = 'https://flatiron-tasklistr.herokuapp.com';
    this.userId = 1;
    this.getExistingData();
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.listFormListener();
    this.taskFormListener();
    this.listsContainerListener();
  }

  listFormListener() {
    const listForm = document.getElementById('create-list-form');
    listForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let newListTitle = e.target[0].value;
      const newList = new List(newListTitle);
      this.lists.push(newList);
      listForm.reset();
    });
  }

  taskFormListener(){
    this.taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newTaskDes = e.target[1].value;
      const newTaskPri = e.target[2].value;
      const newTask = new Task(newTaskDes, newTaskPri);
      const listId = parseInt(e.target[0].value);
      const list = this.lists.find((list) => {
        return list.id === listId;
      });
      list.displayTaskInListBox(newTask);
      this.taskForm.reset();
    });
  }

  listsContainerListener() {
    const listsContainer = document.getElementById('lists');
    listsContainer.addEventListener('click', (e) => {
      if (e.target.className === 'delete-list') {
        // const listBoxDiv = e.target.parentElement.parentElement;
        // listsContainer.removeChild(listBoxDiv);
        let listId = parseInt(e.target.dataset.id);
        this.deleteList(listId);
      }
    });
  }

  deleteList(listId) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application.json',
        Accept: 'application.json'
      },
      body: JSON.stringify({user_id: this.userId})
    };
    fetch(`${this.baseUrl}/lists/${listId}`, options)
    .then(res => console.log(res))
    .then(json => console.log(json));
  }

  getExistingData() {
    fetch(`${this.baseUrl}/lists?user_id=${this.userId}`)
    .then(res => res.json())
    .then(json => this.displayExistingData(json));
  }

  displayExistingData(lists) {
    for(let i = 0; i < lists.length; i++) {
      new List(lists[i].title);
      let tasks = lists[i].tasks;
      for(let j = 0; j< tasks.length; j++) {
        new Task(tasks[i].description, tasks[i].priority);
      }
    }
  }
}
