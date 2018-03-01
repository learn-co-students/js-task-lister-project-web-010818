class App {
  constructor() {
    this.lists = [];
    this.user_id = 10;
    this.createListForm = document.getElementById("create-list-form");
    this.newListTitle = document.getElementById("new-list-title");
    this.selectParentList = document.getElementById("parent-list")
    this.createTaskForm = document.getElementById("create-task-form")
    this.newTaskDescription = document.getElementById("new-task-description")
    this.newTaskPriority = document.getElementById("new-task-priority")
    this.listsSection = document.getElementById("lists");
    this.addEventListeners();
  }

  addEventListeners() {
    this.createListForm.addEventListener("submit", (event) => this.createList(event))
    this.createTaskForm.addEventListener("submit", (event) => this.createTask(event))
    this.listsSection.addEventListener("click", (event) => this.deleteList(event))
    this.renderLists()
  }

  createList(event) {
    event.preventDefault();
    this.createTaskForm.style.display = "block";

    // Create list via API
    const url = 'https://flatiron-tasklistr.herokuapp.com/lists'
    const options = {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user_id: this.user_id, title: this.newListTitle.value })
    }

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        this.lists.push(json)
        this.newListTitle.value = ""
        this.renderLists();
     })

  }

  renderLists() {
    // GET /lists?user_id=user_id
    // const listList = taskLister.lists.map(l => `<option value="${l.id}">${l.title}</option>`).join('');
    const url = `https://flatiron-tasklistr.herokuapp.com/lists?user_id=${this.user_id}`

    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        if (json.length > 0) {
          this.createTaskForm.style.display = "block";
          this.lists = json.map((list) => {
            let newList = new List(list.title, list.id);
            newList.tasks = list.tasks.map(task => {
              let newTask = new Task(task.id, task.description, task.priority)
              return newTask;
            });
            return newList;
          }) // end of map
          this.listsSection.innerHTML = this.lists.map((list) => list.render()).join('');
          this.selectParentList.innerHTML = this.renderOptions();
        } else {
          this.createTaskForm.style.display = "none";
          this.listsSection.innerHTML = "";
      }
    })
  }

  renderOptions() {
    return this.lists.map((list) => {
      return `<option value="${list.id}">${list.title}</option>`}
    ).join('')
  }

  createTask(event) {
    event.preventDefault();
    const newTask = new Task(this.newTaskDescription.value, this.newTaskPriority.value);
    const selectedList = this.lists.find((list) => list.id == this.selectParentList.value)
    selectedList.tasks.push(newTask)
    this.persistTask(selectedList.id)
  }

  persistTask(listId) {
    const url = `https://flatiron-tasklistr.herokuapp.com/lists/${listId}/tasks`
    const body = {
      user_id: this.user_id,
      description: this.newTaskDescription.value,
      priority: this.newTaskPriority.value,
    }
    const options = {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    }

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        this.newTaskDescription.value = "";
        this.newTaskPriority.value = "";
        this.renderLists();
      })
  }

  deleteList(event) {
    this.lists = this.lists.filter(list => list.id !== event.target.id)

    // Now delete from API
    const url = `https://flatiron-tasklistr.herokuapp.com/lists/${event.target.id}`
    const options = {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user_id: this.user_id })
    }

    fetch(url, options)
      .then(res => res.json())
      .then(json => this.renderLists())

  }
