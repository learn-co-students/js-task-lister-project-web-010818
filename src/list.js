/*
list is responsible for creating a single list component
*/
const List = (() => {

  let listStore = []
  return class List {

    constructor(json) {
      this.title = json.title
      this.id = json.id

      this.addListToPage();
      json.tasks.forEach(task => {
        new Task(task, this.id)
      })
    }

    static all() {
      return listStore
    }

    addListToPage() {
      let div = document.createElement('div');
      div.className = "list";
      div.id = `list-${this.id}`;
      let h2 = document.createElement('h2');
      h2.innerText = this.title;
      let ul = document.createElement('ul');
      let button = document.createElement('button');
      button.className = "delete-button"
      button.innerText = "X"
      div.appendChild(h2);
      div.appendChild(ul);
      div.appendChild(button);
      document.getElementById('lists').appendChild(div)
      document.getElementById('parent-list').innerHTML += `<option value=${this.id}>${this.title}</option>`
      this.addDeleteListener();
    }



    addDeleteListener() {
      let div = document.getElementById(`list-${this.id}`)
      let button = div.querySelector('button');
      button.addEventListener('click', event => {
        div.parentNode.removeChild(event.target.parentNode)
        let index = listStore.findIndex(list => {
          return list.id === this.id;
        })
        this.deleteList();
        delete listStore[index];
      })
    }

    deleteList() {
      console.log(this)
      let options = {
        method:'delete',
        headers: {
          'Content-Type':'application/json',
          Accept:'application/json'
        },
        body:JSON.stringify({user_id:5})
      }
      fetch(`https://flatiron-tasklistr.herokuapp.com/lists/${this.id}`, options)
        .then(res => res.json())
        .then(json => console.log(json))

    }



  }

})()
