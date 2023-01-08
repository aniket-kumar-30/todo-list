import React, { useContext, useEffect, useRef, useState } from "react"
import { TodoContext } from "../context/todo"
import { enterCode, escCode } from "../helper/keyCodes"

function Todo({ todo, isEditing, setEditingId }) {
    const { toggleCurrentTodo, removeCurrentTodo, editTodo } = useContext(TodoContext)
    const todoClass = isEditing ? "editing" : ""
    const [editText, setEditText] = useState(todo.text)
    const completedClass = todo.isCompleted ? "completed" : ""
    const getInputElement = useRef(null)
    const removeTodo = () => {
        removeCurrentTodo(todo.id)
    }
    const toggleTodo = () => {
        toggleCurrentTodo(todo.id)
    }

    const moveToEditMode = () => {
        setEditingId(todo.id)

    }
    const changeTodoInput = (e) => {
        setEditText(e.target.value)
    }
    const keyDownEditInput = (e) => {
        if (e.keyCode === enterCode) {
            editTodo(todo.id, e.target.value)
            setEditingId(null)
        }
        if (e.keyCode === escCode) {
            setEditText(todo.text)
            setEditingId(null)
        }
    }
    useEffect(() => {
        if (isEditing) {
            getInputElement.current.focus()
        }
    })

    return (
        <li className={`${todoClass} ${completedClass}`}>
            <div className="view">
                <input type="checkbox"
                    className="toggle"
                    checked={todo.isCompleted}
                    onChange={toggleTodo}
                />
                <label onDoubleClick={moveToEditMode}>{todo.text}</label>
                <button className="destroy" onClick={removeTodo}></button>
            </div>
            {isEditing &&
                (<input type="text" className="edit"
                    ref={getInputElement}
                    value={editText}
                    onChange={changeTodoInput}
                    onKeyDown={keyDownEditInput}
                />)
            }
        </li>
    )
}

export default Todo