const createForm  = document.getElementById("create-list-form")
const listSection = document.getElementById("lists")
const taskForm = document.getElementById("create-task-form")
const dropdown = document.getElementById("parent-list")
const store = {lists:[], tasks:[]}
const apiEndPoint = "https://flatiron-tasklistr.herokuapp.com"
const getListsPath = "/lists?user_id=14"
const userId = 14
