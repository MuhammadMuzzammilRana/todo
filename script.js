var input = document.getElementById('input')
var screen = document.getElementById('show')
var add = document.getElementById('add')
var upd = document.getElementById('upd')
var todos = []
var todoToBeEdit = null
var inputValue = document.getElementById('input').value
var indexToBeUptade = null
function getLocalStorageData(){ 
    var getTodosData = window.localStorage.getItem('todos');
    getTodosData = JSON.parse(getTodosData);
    console.log(getTodosData);
    if(getTodosData !== null){
        todos = getTodosData;
    }
    render()
}
getLocalStorageData();
function addTodo(){
  if (input.value == "") {
    alert('Please fill out the input')
  }
  var todoObj = {
    id: (new Date().getMilliseconds()) + (Math.floor(Math.random()*1001)) + (new Date().getTime()),
    todoValue: input.value,
    createdAt: new Date()
  }
  todos.unshift(todoObj)
  
  input.value = ""
  render()
}
function render() {
  screen.innerHTML = ""
  for(var i=0; i < todos.length; i++){
    screen.innerHTML += `<p><span class="text">${todos[i].todoValue}</span> <button onclick="deleteTodo(${todos[i].id})">Delete</button> <button class="edit" onclick="editTodo(${todos[i].id})">Edit</button><p>`
  }
}
function deleteTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (id == todos[i].id) {
      todos.splice(i,1)
      window.localStorage.setItem("todos", JSON.stringify(todos))
      render()
      break
    }
  }
}
function editTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (id == todos[i].id) {
      todoToBeEdit = todos[i].todoValue
      indexToBeUptade = i
      input.value = todoToBeEdit
      upd.style.display = 'inline'
      add.style.display = 'none'
      console.log(todoToBeEdit)
      break
    }
  }
}
function updateTodo() {
  todos[indexToBeUptade].todoValue = input.value
  input.value = ""
  window.localStorage.setItem("todos", JSON.stringify(todos))
  upd.style.display = 'none'
  add.style.display = 'inline'
  render()
}
