const List = (() => {
  return class List {
    constructor(title, id) {
      this.id = id;
      this.title = title;
      this.tasks = [];
    }

    render() {
      return `<div class="list">
        <h2><button id="${this.id}">X</button>${this.title}</h2>
        <ul>${this.tasks.map((task) => task.render()).join('')}</ul>
        </div>`
    }
  }
})()
