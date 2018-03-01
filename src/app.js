class App {
  constructor() {
    this.lists = []
    this.renderLists = this.renderLists.bind(this)
    this.renderDropDown = this.renderDropDown.bind(this)
  }

  addEventListeners() {
    List.submitListener()
    Task.taskSubmitListener()
  }

  fetchLists(){
    fetch(`${apiEndPoint}${getListsPath}`)
      .then(res => res.json())
      .then(json => this.renderLists(json))
  }

  renderLists(json) {
    for(let i = 0; i < json.length; i++) {
      let list = new List(json[i].title, json[i].id)
      this.lists.push(list)
      list.createList()
      let tasks = json[i].tasks
      for(let j = 0; j < tasks.length; j++) {
        let task = new Task(tasks[j].description, tasks[j].priority, json[i].id, tasks[j].id)
        task.createTask()
      }
    }
    if (listSection.querySelectorAll('div').length === 0) {
      taskForm.style.visibility = 'hidden'
    }
    this.renderDropDown()
  }

  renderDropDown() {
    for (let list of this.lists) {
      list.updateDropdownAdd()
    }
  }


}
