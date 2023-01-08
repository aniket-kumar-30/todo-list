import { useContext } from "react"
import { TodoContext } from "../context/todo"

function Footer() {
    const { todos, Filter, changeFilterName } = useContext(TodoContext)
    const noTodoClass = todos.length === 0 ? 'hidden' : ""
    const countActiveTodos = todos.filter(todo => !todo.isCompleted).length
    const leftItemText = `item${todos.length > 1 ? 's' : ""} left`
    const getSelected = (filterName) => {
        return Filter === filterName ? 'selected' : ""
    }
    const changeFilter = (e, filterName) => {
        e.preventDefault()
        changeFilterName(filterName)
    }
    return (
        <footer className={`footer ${noTodoClass}`}>
            <span className="todo-count">
                <strong>{countActiveTodos}</strong>
                &nbsp;
                {leftItemText}
            </span>
            <ul className="filters">
                <li><a href="/" className={getSelected('all')} onClick={(e) => changeFilter(e, 'all')}>All</a></li>
                <li><a href="/" className={getSelected('active')} onClick={(e) => changeFilter(e, 'active')}>Active</a></li>
                <li><a href="/" className={getSelected('completed')} onClick={(e) => changeFilter(e, 'completed')}>Completed</a></li>
            </ul>
        </footer>
    )
}

export default Footer