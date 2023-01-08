import { createContext, useReducer, useEffect, useContext, useState } from "react";
import reducer from "./reducer";

export const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
    const initialState = {
        todos: [],
        filter: "all"
    }

    const [todoState, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        getTodos()
    }, [])

    const getTodos = async () => {
        const response = await fetch("http://localhost:5000/todo-list")
        const data = await response.json()
        dispatch({ type: 'getTodos', payload: data })
    }
    const addTask = async (newText) => {
        const newTodoList = {
            text: newText,
            isCompleted: false
        }
        const response = await fetch("http://localhost:5000/todo-list", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodoList)
        })
        const data = await response.json()
        dispatch({ type: 'addTask', payload: newText })
    }
    const toggleAllTodo = (toggleTodo) => {
        dispatch({ type: 'toggleAll', payload: toggleTodo })
        todoState.todos.forEach(async (todo) => {
            todo.isCompleted = !todo.isCompleted
            const response = await fetch(`http://localhost:5000/todo-list/${todo.id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(todo)
                })
            const data = await response.json()
        })
    }
    const changeFilterName = (filterName) => {
        dispatch({ type: 'changeFilter', payload: filterName })
    }
    const toggleCurrentTodo = async (id) => {
        dispatch({ type: 'toggleTodo', payload: id })
        todoState.todos.forEach(async (todo) => {
            if (todo.id === id) {
                const toggledTodo = {
                    id: id,
                    text: todo.text,
                    isCompleted: !todo.isCompleted
                }
                const response = await fetch(`http://localhost:5000/todo-list/${id}`,
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(toggledTodo)
                    })
            }
        })
    }

    const removeCurrentTodo = async (id) => {
        dispatch({ type: 'removeTodo', payload: id })
        const response = await fetch(`http://localhost:5000/todo-list/${id}`, { method: 'DELETE' })
        const data = response.json()
    }
    const editTodo = (editId, editValue) => {
        dispatch({ type: 'editTodo', payload: { id: editId, text: editValue } })
        todoState.todos.forEach(async (todo) => {
            if (todo.id === editId) {
                todo.text = editValue
                const response = await fetch(`http://localhost:5000/todo-list/${editId}`,
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(todo)
                    })
                const data = await response.json()
            }
        })
    }
    return <TodoContext.Provider value={
        {
            todos: todoState.todos,
            Filter: todoState.filter,
            addTask,
            toggleAllTodo,
            changeFilterName,
            toggleCurrentTodo,
            removeCurrentTodo,
            editTodo,
        }
    }>{children}</TodoContext.Provider>
}