const form = document.querySelector("#todoAddForm");
// console.log(form)
const addInput = document.querySelector("#todoName");
// console.log(addInput)
const todoList = document.querySelector(".list-group");
// console.log(todoList)
const firstCardBody = document.querySelectorAll(".card-body")[0];
// console.log(firstCardBody);
const secondCardBody = document.querySelectorAll(".card-body")[1];
// console.log(secondCardBody);
const clearButton = document.querySelector("#clearButton");
// console.log(clearButton);
const filterInput=document.querySelector('#todoSearch')
// console.log(filterInput)
let todos = [];

runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", allTodosEveryWhere);
  filterInput.addEventListener('keyup',filter)
}

function removeTodoToUI(e) {
  if (e.target.className === "fa fa-remove") {
    const todo = e.target.parentElement.parentElement;
    todo.remove();

    // remove to storage
    removeTodoToStorage(todo.textContent);
    showAlert("success", "Todo Başarıyla Silindi");
  }
}

function filter(e){
const filterValue=e.target.value.toLowerCase().trim();
const todoListesi=document.querySelectorAll('.list-group-item')
if(todoListesi.length>0){
todoListesi.forEach(function(todo){
    if(todo.textContent.toLowerCase().trim().includes(filterValue)){
todo.setAttribute('style','display:block')
    }else{
todo.setAttribute('style','display:none !important')
    }
})
}else{
    showAlert("warning","Filtreleme Yapmak için En Az Bir Tane Todo Olmalıdır")
}
}

function allTodosEveryWhere() {
  const todoLisesi = document.querySelectorAll(".list-group-item");
  if (todoLisesi.length > 0) {
    todoLisesi.forEach(function (todo) {
      todo.remove();
    });
    todos=[];
    localStorage.setItem('todos',JSON.stringify(todos))
    showAlert("success","Tüm Todolar Temizlendi")
  } else {
    showAlert("warning", "Silmek için En Az Bir Tane Todo Olmalıdır");
  }
}

function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo == todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoUI(todo);
  });
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    showAlert("warning", "Lütfen Boş Bırakmayınız");
  } else {
    addTodoUI(inputText);
    addTodoStorage(inputText);
    showAlert("success", "Todo Eklendi");
  }
  e.preventDefault();
}

function addTodoUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const a = document.createElement("a");
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = "";
}

function addTodoStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.textContent = message;

  firstCardBody.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 2500);
}
