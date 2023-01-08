import { useContext, useState } from "react"
import { TodoContext } from "../context/todo"
import Todo from "./Todo"
function Main() {
    const { todos, Filter, toggleAllTodo } = useContext(TodoContext)
    const [editingId, setEditingId] = useState(null)
    const noTodoClass = todos.length === 0 ? 'hidden' : ""
    const getVisibleTodos = () => {
        if (Filter === 'active') {
            return todos.filter(todo => !todo.isCompleted)
        }
        else if (Filter === 'completed') {
            return todos.filter(todo => todo.isCompleted)
        }
        return todos
    }
    const toggleAll = (e) => {
        toggleAllTodo(e.target.checked)
    }
    const isAllTodoSelectd = todos.every(todo => todo.isCompleted)
    const visibleTodos = getVisibleTodos()
    return (
        <section className={`main ${noTodoClass}`}>
            <input type="checkbox" id="toggle-all" className="toggle-all" checked={isAllTodoSelectd}
                onChange={toggleAll}
            />
            <label htmlFor="toggle-all">Mark all as completed</label>
            <ul className="todo-list">
                {visibleTodos.map(todo => (
                    <Todo key={todo.id} todo={todo} isEditing={editingId === todo.id} setEditingId={setEditingId} />
                    // <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </section>
    )
}

export default Main