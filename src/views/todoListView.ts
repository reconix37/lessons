import {addTodoItem} from "./todoItemView";

export function createTodoList(todos: any[]) {
    const todosTag = document.querySelector<HTMLUListElement>('#todos')
    if (!todosTag) throw new Error("Todos container not found")
    
    todosTag.innerHTML = ""
    todos.forEach(addTodoItem);
}
