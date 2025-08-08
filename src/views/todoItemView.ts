import { updateTodoItem, deleteTodoItem } from "../services/todosService";
import type { Todo } from "../types";

export function addTodoItem(todo: Todo): HTMLLIElement {

    const todosTag = document.querySelector<HTMLUListElement>('#todos')
    if (!todosTag) throw new Error("Todos container not found")
        
    const liTag = document.createElement("li")
    const labelTag = document.createElement("label")
    const spanTag = document.createElement("span")
    const checkBoxTag = document.createElement("input")
    checkBoxTag.type = 'checkbox'

    const deleteButtonTag = document.createElement("button")
    deleteButtonTag.innerText = "Delete"

    checkBoxTag.checked = todo.completed
    checkBoxTag.onclick = async function () {
        const updatedTodo = { ...todo, completed: checkBoxTag.checked }
        const response = await updateTodoItem(updatedTodo)

        if (response.ok) {
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
    return liTag
}