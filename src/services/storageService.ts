export function readTodos(): any[] {
    const currentTodos = localStorage.getItem("todos")
    if (!currentTodos) {
        return []; //Обязательно ли делать такие проверки
    }
    try {
        return JSON.parse(currentTodos) as any[];
    } catch {
        return [];
    }
}
export function writeTodos(todos: any[]): void { //как делать интерфейсы правильно и для чего они
    localStorage.setItem("todos", JSON.stringify(todos))
}