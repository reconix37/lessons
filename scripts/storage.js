export function readTodos(){
const currentTodos = localStorage.getItem("todos")
return JSON.parse(currentTodos)
}

export function writeTodos(todos){
localStorage.setItem("todos", JSON.stringify(todos))
}