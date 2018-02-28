/*
list is responsible for creating a single list component
*/
const List = (() => {
  let id = 1

  return class List {
    constructor(title) {
      this.title = title
      this.id = id++
      store.lists.push(this)
      // NOTE: How can we use the private id variable to auto increment list ids🤔?
    }

    static submitListener(){

      createForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let listInput = event.target.children[1]
        let list = new List(listInput.value)
        list.createList()
        list.updateDropdown()
        listInput.value = ""
        taskForm.style.visibility = 'visible'
      })
    }

    deleteListener(button){
      button.addEventListener("click", (event) =>{
        let divs = listSection.children
        let foundDiv;
        for (let i = 0; i < divs.length; i++){
          if(divs[i].dataset.listId === button.dataset.listId){
              foundDiv = divs[i]
            }
          }
        listSection.removeChild(foundDiv)
        let remainingDivs = listSection.children
        if (remainingDivs.length === 0) {
          taskForm.style.visibility = 'hidden'
        }
      })
    }

    createList(){
      let div = document.createElement("div")
      let header = document.createElement("h2")
      let ul = document.createElement("ul")
      let button = this.createDeleteButton()
      div.append(button)
      div.append(header)
      div.setAttribute("data-list-id",this.id)
      div.append(ul)
      header.innerText += this.title
      listSection.append(div)

    }

    updateDropdown() {
      let option = document.createElement('option')
      option.innerText = this.title
      option.setAttribute("data-list-id", this.id)
      dropdown.append(option)
    }

    createDeleteButton(){
      let button = document.createElement("button")
      button.setAttribute("data-list-id", this.id)
      button.className = "delete-list"
      button.innerText = "x"
      this.deleteListener(button)
      return button
    }


  }
})()
