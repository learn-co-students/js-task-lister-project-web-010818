document.addEventListener('DOMContentLoaded', () => {
  const listForm = document.getElementById("create-list-form");
  const listInput = document.getElementById("new-list-title");
  const taskForm = document.getElementById("create-task-form")
  const selectList = document.getElementById("parent-list")
  const descInput = document.getElementById("new-task-description");
  const priInput = document.getElementById("new-task-priority");
  const user_id = 10;
  taskForm.style.display = "none";
  displayLists();
  listForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createList(event)
  })

  function createList(event) {
    // Create list via API first
    const url = 'https://flatiron-tasklistr.herokuapp.com/lists'
    const options = {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user_id: user_id, title: listInput.value })
    }

    fetch(url, options)
      .then(res => res.json())
      .then(json => addList(json))
  }

  function addList(json) {
    // Create new list object
    const newList = new List(json.id, json.title);
    // Clear input field and make task form appear
    listInput.value = "";
    taskForm.style.display = "block";

    // Build new option for new list and append to task select form
    const listOption = document.createElement('option');
    listOption.setAttribute('value', newList.id);
    listOption.setAttribute("id", `option-${newList.id}`)
    listOption.innerText = newList.title;
    selectList.appendChild(listOption);

    // Add list to list viewing area
    const showLists = document.getElementById("lists");
    const div = document.createElement('div')
    div.setAttribute('id', `list-${newList.id}`)
    div.setAttribute("class", "list")
    const h2 = document.createElement('h2');
    const button = document.createElement('button');
    button.setAttribute("data-id", newList.id);
    button.setAttribute("class", "delete-list")
    button.innerText = 'X'
    const text = document.createTextNode(newList.title)
    const ul = document.createElement('ul');
    h2.appendChild(button);
    h2.appendChild(text);
    div.appendChild(h2)
    div.appendChild(ul)
    showLists.appendChild(div)

    button.addEventListener('click', (event) => {
      event.preventDefault()
      //remove div with matching id
      const div = document.getElementById(`list-${event.target.dataset.id}`)
      div.remove()
      deleteList(event.target.dataset.id)
    })
  }

  function deleteList(listId) {
    // DELETE /lists/:list_id
    const url = `https://flatiron-tasklistr.herokuapp.com/lists/${listId}`
    const options = {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user_id: user_id })
    }

    fetch(url, options)
      .then(res => res.json())
      .then(json => json)

    const listOption = document.getElementById(`option-${listId}`);
    listOption.remove();
  }

  function displayLists() {
    // GET /lists?user_id=user_id
    // const listList = taskLister.lists.map(l => `<option value="${l.id}">${l.title}</option>`).join('');
    const url = `https://flatiron-tasklistr.herokuapp.com/lists?user_id=${user_id}`

    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }

    fetch(url, options)
      .then(res => res.json())
      .then(json => json.forEach((list) => {
        addList(list)
        displayTasks(list.id)
      }))
  }

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createTask(event);
  })

  function createTask(event) {
    // POST /lists/:list_id/tasks
    const url = `https://flatiron-tasklistr.herokuapp.com/lists/${selectList.value}/tasks`
    const body = {
      user_id: user_id,
      description: descInput.value,
      priority: priInput.value,
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
      .then(json => addTask(json, selectList.value))
  }

  function displayTasks(listId) {
    const url = `https://flatiron-tasklistr.herokuapp.com/lists/${listId}/tasks?user_id=${user_id}`

    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }

    fetch(url, options)
      .then(res => res.json())
      .then(json => json.forEach((task) => addTask(task, listId)))
  }

  function addTask(json, listId) {
    const newTask = new Task(json.id, listId, json.description, json.priority);
    descInput.value = ""
    priInput.value = ""
    const ul = document.getElementById(`list-${listId}`).getElementsByTagName('ul')[0]
    const li = document.createElement('li');
    li.setAttribute('data-id', listId);
    const text = `Task: ${newTask.description} <br> Priority: ${newTask.priority}`;
    li.innerHTML = text;
    ul.appendChild(li)
  }
})
