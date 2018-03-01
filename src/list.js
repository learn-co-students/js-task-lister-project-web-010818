/*
list is responsible for creating a single list component
*/
const List = (() => {
  let id = 1

  return class List {
    constructor(title, id) {
      this.title = title
      // this.id = id++
      this.id = id
      store.lists.push(this)
    }

    static submitListener(){

      createForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let listInput = event.target.children[1]
        // let list = new List(listInput.value) //FOR NON API VERSION
        List.postList(listInput.value) //FOR API VERSION
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
        List.deleteList(foundDiv.dataset.listId)
        List.updateDropdownDelete(foundDiv.dataset.listId)
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
      return this
    }

    updateDropdownAdd() {
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

    static postList(title) {
      let body = {"user_id": userId, "title": title};
      let options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
      fetch(`${apiEndPoint}/lists`, options)
        .then(res => res.json())
        .then((json) => {
          let list = new List(json.title, json.id)
          list.createList()
          list.updateDropdownAdd()
        })
    }

    static deleteList(listId) {
      console.log(listId);
      let body = {"user_id": userId};
      let options = {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
      fetch(`https://flatiron-tasklistr.herokuapp.com/lists/${listId}`, options)
        .then(res => res.json())
        .then(json => console.log(json))
    }

    static updateDropdownDelete(listId) {
      let options = dropdown.children
      let foundOption;
      for(let i = 0; i < options.length; i++) {
        if (options[i].dataset.listId == listId) {
          foundOption = options[i]
        }
      }
      foundOption.outerHTML = ""
    }


  }
})()
