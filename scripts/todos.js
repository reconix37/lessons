import { readTodos, writeTodos } from "./storage.js";


function helloThere() {
  console.log("Hello There");
}

async function loadTodos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
        const json = await response.json()
        return json;
    } catch (error) {
        const todosTag = document.getElementById("todos")
        todosTag.innerHTML = ""
        todosTag.innerHTML = "error"
    }
}

async function deleteTodoItem(todoId) {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: "DELETE",
    })
}

async function updateTodoItem(todoItem) {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${todoItem.id}`, {
        method: "PUT",
        body: JSON.stringify(todoItem),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
}

function addTodoItem(todo) {
    const todosTag = document.getElementById("todos")
    const liTag = document.createElement("li")
    const labelTag = document.createElement("label")
    const spanTag = document.createElement("span")
    const checkBoxTag = document.createElement("input")
    const deleteButtonTag = document.createElement("button")

    checkBoxTag.type = 'checkbox'
    checkBoxTag.checked = todo.completed
    checkBoxTag.onclick = async function () {

        const updatedTodo = {...todo, completed: checkBoxTag.checked}
        const response = await updateTodoItem(updatedTodo)

        if (response.ok){
            const json = await response.json()

            if (json.completed) {
                liTag.appendChild(deleteButtonTag)
            } else {
                deleteButtonTag.remove()
            }
        } else {
            alert('There was an error with updateing todo item.')
            checkBoxTag.checked = !updatedTodo.completed
        }
    }

    deleteButtonTag.innerText = "Delete"
    deleteButtonTag.onclick = async function () {
        const response = await deleteTodoItem(todo.id)
        if (response.ok) {
            liTag.remove()
        }
    }

    spanTag.innerText = todo.title


    labelTag.appendChild(checkBoxTag)
    labelTag.appendChild(spanTag)

    liTag.appendChild(labelTag)
    if (todo.completed) {
        liTag.appendChild(deleteButtonTag)
    }

    todosTag.prepend(liTag)

}

function createTodoList(todos) {
    const todosTag = document.getElementById("todos")
    todosTag.innerHTML = ""
    todos.forEach(addTodoItem);
}

async function init() {
    const createFormTag = document.getElementById("create-todo")
    createFormTag.onsubmit = handleSubmit
    try {
        const todos = await loadTodos()
        createTodoList(todos)
    } catch (error) {
        const todosTag = document.getElementById("todos")
        todosTag.innerHTML = ""
        todosTag.innerHTML = "Error: was not able to load todos."
    }

    helloThere()
}

async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const rawData = { ...Object.fromEntries(formData), completed: false, userId: 1 }
    const body = JSON.stringify(rawData)

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/', {
            method: 'POST',
            body,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        const newTodo = await response.json()
        // read current todos from storage
        const currentTodos = readTodos()
        // add to new todo to current todos
        const updTodos = [newTodo, ...currentTodos]
        // updated current todos to storage
        writeTodos(updTodos)
        // re-create todos list
        addTodoItem(newTodo)
    } catch (error) {
        const todosTag = document.getElementById("todos")
        todosTag.innerHTML = ""
        todosTag.innerHTML = "error"
    }
}

init()