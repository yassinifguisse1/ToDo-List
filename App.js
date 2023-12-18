//Selectors
let toDoInput = document.querySelector('.todo-input');
let toDoButton = document.querySelector(".todo-button");
let toDoContainer = document.querySelector(".todo-container"); 
let toDoList = document.querySelector(".todo-list");

let btnCompleted = document.querySelector('.btnCompleted');
let btnActive = document.querySelector('.btnActive');
let btnAll = document.querySelector('.btnAll');

document.addEventListener('DOMContentLoaded', getTodos)
toDoButton.addEventListener('click', addToDo);
btnCompleted.addEventListener('click', complletedTask);
btnActive.addEventListener('click', activeTask);
btnAll.addEventListener('click', AllTask);

// Event Listeners
// let todo;
let todos ;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); 
  }

function addToDo(event){
    event.preventDefault(); // Prevent the default form submission behavior
    let toDoText = toDoInput.value;
    
    
    if(toDoText.trim() !== ""){

     
       let taskId = Date.now();
       let todo = {
       id: taskId,
       text: toDoText,
       completed: false,
      } ;
      // todos.push(todo);
      saveLocalTodos(todo);

        let container = document.createElement("div");
        container.classList.add('todo-container');
        

        let toDoList = document.createElement("lu");
        toDoList.classList.add('todo-list');
    
        let listItem = document.createElement("li");
        listItem.classList.add('Todo-List');
        listItem.innerText = toDoText;

        let toDo = document.createElement("div");
        toDo.classList.add('todo');
        

        let checkButton = document.createElement("button");
        checkButton.classList.add('btn-check');  
        checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';

        checkButton.addEventListener("click", function() {
         
            container.classList.toggle("completed");
            
            
        });
       
        
        let deleteButton = document.createElement("button");
        deleteButton.classList.add('btn-delete');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

        deleteButton.addEventListener("click", function() {
          
            container.classList.toggle("fall");
            container.classList.toggle("completed"); 
            
            container.addEventListener('transitionend', function(){
              container.remove(); 
              removeLocalTodo(toDo);
            })
            
            
        });

       
        toDo.appendChild(listItem);
        toDo.appendChild(checkButton);
        toDo.appendChild(deleteButton);
        toDoList.appendChild(toDo);
        container.appendChild(toDoList);
        document.body.appendChild(container);

        toDoInput.value='';
        // saveLocalTodos(todo);
        
    }
   
};



function complletedTask(e) {
   
    let todos = document.querySelectorAll('.todo-container');
    todos.forEach(function(container) {

      if(e.target.value === "completed"){

        if (container.classList.contains("completed")) {

            container.style.display = "flex";
        } else {

            container.style.display = "none";
        }
      }
    });
}

function activeTask(e) {
   
    let todos = document.querySelectorAll('.todo-container');
    todos.forEach(function(container) {

      if(e.target.value === "active"){

        if (!container.classList.contains("completed")) {

            container.style.display = "flex";
        } else {
            
            container.style.display = "none";
        }
      }
    });
}

function AllTask(e) {
   
    let todos = document.querySelectorAll('.todo-container');
    todos.forEach(function(container) {

      if(e.target.value === "all"){
        container.style.display = "flex"; 
       
      }
    });
}


function saveLocalTodos(todo) {
  // Check if there are already todos in local storage
  // let todos;
  // if (localStorage.getItem("todos") === null) {
  //   todos = [];
  // } else {
  //   todos = JSON.parse(localStorage.getItem("todos")); 
  // }
  // todos.push(todo);
  // localStorage.setItem("todos", JSON.stringify(todos));

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// function saveLocalTodos(todos) {
//   localStorage.setItem("todos", JSON.stringify(todos));
// }
// remove todo from localstorage

function removeLocalTodo(toDo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  
  }else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = toDo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));


}


function getTodos(){

  // let todos;
  // if(localStorage.getItem("todos") === null){
  //   todos = [];
    
  // }else{
  //   todos = JSON.parse(localStorage.getItem("todos"))
  // }
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach(function(todo){

        let container = document.createElement("div");
        container.classList.add('todo-container');
        

        let toDoList = document.createElement("lu");
        toDoList.classList.add('todo-list');
    
        let listItem = document.createElement("li");
        listItem.classList.add('Todo-List');
        listItem.innerText = todo.text;

        let toDo = document.createElement("div");
        toDo.classList.add('todo');

        let checkButton = document.createElement("button");
        checkButton.classList.add('btn-check');  
        checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';

        if (todo.completed) {
          container.classList.add("completed"); // Apply the "completed" class if task is completed
        }

        checkButton.addEventListener("click", function() {
          taskdone(todo.id)
          container.classList.toggle("completed");
           
          
        });
       
        
        let deleteButton = document.createElement("button");
        deleteButton.classList.add('btn-delete');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

        deleteButton.addEventListener("click", function() {
          
            container.classList.toggle("fall");
            container.classList.toggle("completed");
           
            container.addEventListener('transitionend', function(){
              container.remove();
              
            })
        });

       
        
        toDo.appendChild(listItem);
        toDo.appendChild(checkButton);
        toDo.appendChild(deleteButton);
        toDoList.appendChild(toDo);
        container.appendChild(toDoList);
        document.body.appendChild(container);

  })
}



function taskdone(taskId){
 
  for(let i = 0; i < todos.length; i++){
    if(todos[i].id == taskId){
      // todos[i].completed == false ? (todos[i].completed = true) : (todos[i].completed = false)
      todos[i].completed = !todos[i].completed;
    }

  }
  localStorage.setItem("todos", JSON.stringify(todos));
}