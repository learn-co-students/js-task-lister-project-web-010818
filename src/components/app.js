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

  // function createList(event) {
  //   // Create list via API first
  //   const url = 'https://flatiron-tasklistr.herokuapp.com/lists'
  //   const options = {
  //     method: 'post',
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify({ user_id: user_id, title: listInput.value })
  //   }
  //
  //   fetch(url, options)
  //     .then(res => res.json())
  //     .then(json => addList(json))
  // }
  //
  // function addList(json) {
  //   // Create new list object
  //   const newList = new List(json.id, json.title);
  //   // Clear input field and make task form appear
  //   listInput.value = "";
  //   taskForm.style.display = "block";
  //
  //   // Build new option for new list and append to task select form
  //   const listOption = document.createElement('option');
  //   listOption.setAttribute('value', newList.id);
  //   listOption.setAttribute("id", `option-${newList.id}`)
  //   listOption.innerText = newList.title;
  //   selectList.appendChild(listOption);
  //
  //   // Add list to list viewing area
  //   const showLists = document.getElementById("lists");
  //   const div = document.createElement('div')
  //   div.setAttribute('id', `list-${newList.id}`)
  //   div.setAttribute("class", "list")
  //   const h2 = document.createElement('h2');
  //   const button = document.createElement('button');
  //   button.setAttribute("data-id", newList.id);
  //   button.setAttribute("class", "delete-list")
  //   button.innerText = 'X'
  //   const text = document.createTextNode(newList.title)
  //   const ul = document.createElement('ul');
  //   h2.appendChild(button);
  //   h2.appendChild(text);
  //   div.appendChild(h2)
  //   div.appendChild(ul)
  //   showLists.appendChild(div)
  //
  //   button.addEventListener('click', (event) => {
  //     event.preventDefault()
  //     //remove div with matching id
  //     const div = document.getElementById(`list-${event.target.dataset.id}`)
  //     div.remove()
  //     deleteList(event.target.dataset.id)
  //   })
  // }


//   addTask(json, listId) {
//     const newTask = new Task(json.id, listId, json.description, json.priority);
//     descInput.value = ""
//     priInput.value = ""
//     const ul = document.getElementById(`list-${listId}`).getElementsByTagName('ul')[0]
//     const li = document.createElement('li');
//     li.setAttribute('data-id', listId);
//     const text = `Task: ${newTask.description} <br> Priority: ${newTask.priority}`;
//     li.innerHTML = text;
//     ul.appendChild(li)
//   }
// })

  // function createTask(event) {
  //   // POST /lists/:list_id/tasks
  //   const url = `https://flatiron-tasklistr.herokuapp.com/lists/${selectList.value}/tasks`
  //   const body = {
  //     user_id: user_id,
  //     description: descInput.value,
  //     priority: priInput.value,
  //   }
  //
  //   const options = {
  //     method: 'post',
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify(body)
  //   }
  //
  //   fetch(url, options)
  //     .then(res => res.json())
  //     .then(json => addTask(json, selectList.value))
  // }

  // function displayTasks(listId) {
  //   const url = `https://flatiron-tasklistr.herokuapp.com/lists/${listId}/tasks?user_id=${user_id}`
  //
  //   const options = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     }
  //   }
  //
  //   fetch(url, options)
  //     .then(res => res.json())
  //     .then(json => {
  //       if (json.length > 0) {
  //         json.forEach((task) => addTask(task, listId))
  //       }
  //     })
  // }

  // deleteList(listId) {
  //   // DELETE /lists/:list_id
  //   const url = `https://flatiron-tasklistr.herokuapp.com/lists/${listId}`
  //   const options = {
  //     method: 'delete',
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify({ user_id: user_id })
  //   }
  //
  //   fetch(url, options)
  //     .then(res => res.json())
  //     .then(json => json)
  //
  //   const listOption = document.getElementById(`option-${listId}`);
  //   listOption.remove();
  //   if (document.getElementById('parent-list').childNodes.length === 0) {
  //     taskForm.style.display = "none";
  //   }
  // }


}
