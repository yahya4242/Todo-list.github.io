//selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo');



//event listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



//functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();

    //if input is empty
    if (todoInput.value.length == 0) {
        alert('Please write an item')
    } else {
        //Todo DIV
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
            //create LI
        const newTodo = document.createElement('li')
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //add todo to local storage
        saveLocalTodos(todoInput.value);
        //CHECK MARK button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<li class="fa fa-check"></li>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //TRASH button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<li class="fa fa-trash"></li>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
        //clear todo input value
        todoInput.value = "";
    }
}

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }


    //check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;


        }
    })
}


function saveLocalTodos(todo) {
    //check -- do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //if dont have array already , push the current one
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    //check -- do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        //Todo DIV
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
            //create LI
        const newTodo = document.createElement('li')
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //CHECK MARK button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<li class="fa fa-check"></li>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //TRASH button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<li class="fa fa-trash"></li>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    });

}

function removeLocalTodos(todo) {
    //check -- do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}