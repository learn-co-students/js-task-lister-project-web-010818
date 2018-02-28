const Relation = (() => {
  let id = 1
  return class Relation {
    constructor(listId, taskId) {
      this.id = id++;
      this.listId = listId;
      this.taskId = taskId
    }

    getList(listId) {
      return taskLister.lists.find((list) => list.id === listId)
    }

    getTask(taskId) {
      return taskLister.tasks.find((task) => task.id === taskId)
    }
  }
})()
