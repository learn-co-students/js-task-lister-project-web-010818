class App {
  constructor() {
    this.listForm = document.getElementById('create-list-form')
    this.taskForm = document.getElementById('create-task-form')
  }

  fetchLists() {
    fetch('https://flatiron-tasklistr.herokuapp.com/lists?user_id=5')
      .then(res => res.json())
      .then(json => {
        json.forEach(list => {
          console.log(list)
          new List(list)
        })
      })
  }

  addListListener() {
    this.listForm.addEventListener('submit',event => {
      event.preventDefault();
      let newTitle = event.target[0].value
      this.postList(newTitle);
      event.target[0].value = ""
      this.taskForm.style = "visibility:visible"
    })
  }

  postList(title) {
    let options = {
      method:'post',
      headers: {
        'Content-Type':'application/json',
        Accept:'application/json'
      },
      body:JSON.stringify({user_id:5, title:title})
    }
    fetch('https://flatiron-tasklistr.herokuapp.com/lists', options)
      .then(res => res.json())
      .then(json => new List(json))
  }



  addTaskListener() {
    this.taskForm.addEventListener('submit',event => {
      event.preventDefault();
      let listId = event.target[0].value
      let description = event.target[1].value
      let priority = event.target[2].value
      this.postTask(listId, description, priority)
      event.target[1].value = ""
      event.target[2].value= ""
    })
  }

  postTask(listId, description, priority) {
    let options = {
      method:'post',
      headers: {
        'Content-Type':'application/json',
        Accept:'application/json'
      },
      body:JSON.stringify({user_id:5, description:description, priority:priority})
    }
    fetch(`https://flatiron-tasklistr.herokuapp.com/lists/${listId}/tasks`, options)
      .then(res => res.json())
      .then(json => new Task(json, listId))
  }


}
