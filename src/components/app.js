/*jshint esversion: 6 */
class App {
  constructor() {
    this.taskForm = document.getElementById('create-task-form');
    this.taskForm.style.display = 'none';
    this.getAllData();
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
      this.persistNewList(newListTitle);
      listForm.reset();
    });
  }

  persistNewList(listTitle) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({user_id: 1, title: listTitle})
    };
    fetch('https://flatiron-tasklistr.herokuapp.com/lists', options)
      .then(res => res.json())
      .then(json => new List(json.title, json.id, json.tasks));
  }

  taskFormListener(){
    this.taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newTaskDes = e.target[1].value;
      const newTaskPri = e.target[2].value;
      const listId = parseInt(e.target[0].value);
      this.persistNewTask(newTaskDes, newTaskPri, listId);
      this.taskForm.reset();
    });
  }

  persistNewTask(description, priority, listId) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({user_id: 1, description: description, priority: priority})
    };
    fetch(`https://flatiron-tasklistr.herokuapp.com/lists/${listId}/tasks`, options)
      .then(res => res.json())
      .then(json => this.updateTasks(json));
  }

  updateTasks(task) {
    new Task(task.description, task.priority);
    this.getAllData();
  }

  listsContainerListener() {
    const listsContainer = document.getElementById('lists');
    listsContainer.addEventListener('click', (e) => {
      if (e.target.className === 'delete-list') {
        const listBoxDiv = e.target.parentElement.parentElement;
        listsContainer.removeChild(listBoxDiv);
        let listId = parseInt(e.target.dataset.id);
        this.deleteList(listId);
      }
    });
  }

  deleteList(listId) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({user_id: 1})
    };
    fetch(`https://flatiron-tasklistr.herokuapp.com/lists/${listId}`, options)
    .then(res => res.json())
    .then(json => console.log(json));
  }

  getAllData() {
    fetch(`https://flatiron-tasklistr.herokuapp.com/lists?user_id=1`)
    .then(res => res.json())
    .then(json => this.allLists(json));
  }

  allLists(lists) {
    this.lists = lists;
    this.displayAll(lists);
  }

  displayAll(lists) {
    for(let i = 0; i < lists.length; i++) {
      new List(lists[i].title, lists[i].id, lists[i].tasks);
      let tasks = lists[i].tasks;
      for(let j = 0; j< tasks.length; j++) {
        new Task(tasks[j].description, tasks[j].priority);
      }
    }
  }
}
