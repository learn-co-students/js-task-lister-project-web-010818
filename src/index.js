let taskLister = { lists: [], tasks: [] }

document.addEventListener('DOMContentLoaded', () => {
  const listForm = document.getElementById("create-list-form");
  const listInput = document.getElementById("new-list-title");

  const taskForm = document.getElementById("create-task-form")
  const selectList = document.getElementById("parent-list")
  const descInput = document.getElementById("new-task-description");
  const priInput = document.getElementById("new-task-priority");
  taskForm.style.display = "none";

  listForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = 'https://flatiron-tasklistr.herokuapp.com/lists'
    const options = {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user_id: 1, title: listInput.value })
    }

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json));
  }

  function createList(json) {
    console.log(json.id)
    // const newList = new List(json.id);
    // listInput.value = ""
    // taskLister.lists.push(newList);
    // const listList = taskLister.lists.map(l => `<option value="${l.id}">${l.title}</option>`).join('');
    // selectList.innerHTML = listList;
    // taskForm.style.display = "block";
    // const showLists = document.getElementById("lists");
    // const div = document.createElement('div')
    // div.setAttribute('id', newList.id)
    // div.setAttribute("class", "list")
    // const h2 = document.createElement('h2');
    // const button = document.createElement('button');
    // button.setAttribute("data-id", newList.id);
    // button.setAttribute("class", "delete-list")
    // button.innerText = 'X'
    // const text = document.createTextNode(newList.title)
    // const ul = document.createElement('ul');
    // h2.appendChild(button);
    // h2.appendChild(text);
    // div.appendChild(h2)
    // div.appendChild(ul)
    // showLists.appendChild(div)
    //
    // button.addEventListener('click', (event) => {
    //   event.preventDefault()
    //   //remove div with matching id
    //   const div = document.getElementById(event.target.dataset.id)
    //   div.remove()
    //   //remove from taskLister
    //   console.log("before removing", taskLister)
    //   taskLister.lists = taskLister.lists.filter((list) => list.id !== event.target.dataset.id)
    //   taskLister.tasks = taskLister.tasks.filter((list) => task.listId !== event.target.dataset.id)
    //   console.log("after removing", taskLister)
    // })
  }
})

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTask = new Task(selectList.value, descInput.value, priInput.value);
    descInput.value = ""
    priInput.value = ""
    taskLister.tasks.push(newTask);
    const ul = document.getElementById(selectList.value).getElementsByTagName('ul')[0]
    const li = document.createElement('li');
    li.setAttribute('data-id', selectList.value);
    const text = `Task: ${newTask.description} <br> Priority: ${newTask.priority}`;
    li.innerHTML = text;
    ul.appendChild(li)
    // <li data-id="1">Task: af <br> Priority: asgfag</li>
  })

});
