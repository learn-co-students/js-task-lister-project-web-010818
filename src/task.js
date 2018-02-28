/*
task is responsible for creating a single task object
*/
const Task = (() => {
  let id = 1

  return class Task {
    constructor(description, priority, listId) {
      //your code here
      this.description = description;
      this.priority = priority;
      this.id = id++;
      this.listId = listId
      store.tasks.push(this)
    }

    static taskSubmitListener(){
      taskForm.addEventListener("submit", event => {
        event.preventDefault()
        // console.log(event.target.children[1])
        let listDropDown = event.target.children[1]
        let listId = listDropDown.selectedOptions[0].dataset.listId
        let description = event.target.children[3]
        let priority = event.target.children[5]
        let task = new Task(description.value, priority.value, listId)
        task.createTask()
          description.value = ""
          priority.value = ""
      })
    }

    createTask(){
      let li = document.createElement("li")
      li.setAttribute("data-task-id", this.id)
      li.innerHTML = `Task:${this.description} <br> Priority:${this.priority}`
      let allDivs = listSection.children
      let foundDiv;
      for(let i = 0; i<allDivs.length; i++){
        if(allDivs[i].dataset.listId === this.listId){
          foundDiv = allDivs[i]
        }
      }
      let foundDivUl = foundDiv.querySelector('ul')
      foundDivUl.append(li)

    }
  }

})()
