import type { Todo } from "../types"

export async function loadTodos(): Promise<Todo[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
    return response.json()
}
export async function deleteTodoItem(todoId: number): Promise<Response> {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: "DELETE",
    })
}
export async function updateTodoItem(todoItem: Todo): Promise<Response> {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${todoItem.id}`, {
        method: "PUT", 
        body: JSON.stringify(todoItem),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
 }