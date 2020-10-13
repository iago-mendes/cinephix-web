import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import { FiSend } from 'react-icons/fi'

import './styles.css'
import Tabs from '../../components/Tabs'
import Dropzone from '../../components/Dropzone'
import api from '../../services/api'

const Add = () =>
{
    const [name, setName] = useState<string>('')
    const [selectedFile, setSelectedFile] = useState<File>()

    const history = useHistory()

    function handleNameInputChange(event: ChangeEvent<HTMLInputElement>)
    {
        setName(event.target.value)
    }

    async function handleSubmit(event: FormEvent)
    {
        event.preventDefault()

        const data = new FormData()
        data.append('name', name)
        if (selectedFile) data.append('image', selectedFile)
        
        await api.post('/characters', data)
        alert('Character added!')
        history.push('/characters')
    }

    return (
        <>
            <Tabs />
            <form onSubmit={handleSubmit} autoComplete="off" id="container2">
                <div className="characterImage">
                    <Dropzone fileUploaded='' onFileUploaded={setSelectedFile} />
                </div>
                <div className="characterInfo">
                    <input
                        className="nameInput"
                        name="name"
                        onChange={handleNameInputChange}
                        placeholder="Name"
                        type="text"
                    />
                    <button type="submit" className="submitButton">
                        <FiSend />
                        <span>Submit</span>
                    </button>
                </div>
            </form>
        </>
    )
}

export default Add