import './style.css'
import {createTodoList} from "./views/todoListView";
import {addTodoItem} from "./views/todoItemView";
import {loadTodos} from "./services/todosService";
import {readTodos, writeTodos} from "./services/storageService";

async function init() {
    const createFormTag = document.querySelector<HTMLFormElement>("#create-todo") as HTMLFormElement
    createFormTag.onsubmit = handleSubmit
    try {
        const todos = await loadTodos()
        createTodoList(todos)
    } catch (error) {
        const todosTag = document.querySelector<HTMLUListElement>('#todos') as HTMLUListElement
        todosTag.innerHTML = ""
        todosTag.innerHTML = "error"
    }
}

async function handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
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
        const currentTodos = readTodos()
        const updTodos = [newTodo, ...currentTodos]
        writeTodos(updTodos)
        addTodoItem(newTodo)
    } catch (error) {
        const todosTag = document.querySelector<HTMLUListElement>('#todos')
        if (!todosTag) throw new Error("Todos container not found")
        todosTag.innerHTML = ""
        todosTag.innerHTML = "error"
    }
}

init()
