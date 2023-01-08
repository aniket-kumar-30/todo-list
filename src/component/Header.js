import { useContext, useState } from 'react'
import { TodoContext } from '../context/todo'
import { enterCode } from '../helper/keyCodes'
function Header() {
    const [text, setText] = useState("")
    const { addTask } = useContext(TodoContext)
    const changeText = (e) => {
        setText(e.target.value)
    }
    const keydownText = (e) => {
        const hasText = text.length > 0
        const newText = text.trim()
        const isEnter = e.keyCode === enterCode
        if (isEnter && hasText) {
            addTask(newText)
            setText("")
        }
    }
    return (
        <header className='header'>
            <h1>todos</h1>
            <input type="text"
                className='new-todo'
                placeholder='What needs to be done?'
                value={text}
                autoFocus
                onChange={changeText}
                onKeyDown={keydownText}
            />
        </header>
    )
}

export default Header