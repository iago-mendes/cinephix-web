import React from 'react'
import { FiSave } from 'react-icons/fi'

const Input = () =>
{
    return (
        <form onSubmit={() => {}} className="inputContainer">
            <input type="text"/>
            <button onClick={() => {}}>
                <FiSave />
                <span>Save</span>
            </button>
        </form>
    )
}

export default Input