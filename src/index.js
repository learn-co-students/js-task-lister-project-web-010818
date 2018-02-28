document.addEventListener('DOMContentLoaded', () => {
  console.log("The DOM content has loaded");
  // your code here ....
  let app = new App();
  app.addListListener();
  app.addTaskListener();
  app.fetchLists();
});
