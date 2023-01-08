const reducer = (state, action) => {
    switch (action.type) {
        case 'getTodos': {
            return {
                ...state,
                todos: action.payload
            }
        }
        case 'addTask': {
            const newTask = {
                id: Math.random().toString(16),
                text: action.payload,
                isCompleted: false
            }
            return {
                ...state,
                todos: [...state.todos, newTask]
            }
        }
        case 'toggleAll': {
            const updatedTodo = state.todos.map(todo => ({
                ...todo,
                isCompleted: action.payload
            }))
            return {
                ...state,
                todos: updatedTodo
            }
        }
        case 'changeFilter': {
            return {
                ...state,
                filter: action.payload
            }
        }
        case 'editTodo': {
            const updatedTodos = state.todos.map(todo => todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo)
            return {
                ...state,
                todos: updatedTodos
            }
        }
        case 'toggleTodo': {
            const updatedTodos = state.todos.map(todo => todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo)
            return {
                ...state,
                todos: updatedTodos
            }
        }
        case 'removeTodo': {
            const updatedTodos = state.todos.filter(todo => todo.id !== action.payload)
            return {
                ...state,
                todos: updatedTodos
            }
        }
        default:
            return state;
    }
}
export default reducer