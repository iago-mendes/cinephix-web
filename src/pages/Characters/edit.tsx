import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Tabs from '../../components/Tabs'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { FiSend } from 'react-icons/fi'

const Edit = () =>
{
    const {id} = useParams()
    const [name, setName] = useState<string>('')
    const [imageUrl, setImageUrl] = useState<string>('')

    const history = useHistory()

    useEffect(() => // collect character info
    {
        api.get(`characters/${id}`).then(res =>
        {
            setName(res.data.name)
            setImageUrl(res.data.image)
        })
    }, [id])

    function handleImageClick()
    {
        return alert('It is not possible to edit the image. If you want to change it, delete the character and add a new one.')
    }

    function handleNameInputChange(event: ChangeEvent<HTMLInputElement>)
    {
        setName(event.target.value)
    }

    async function handleSubmit(event: FormEvent)
    {
        event.preventDefault()

        const data = {name: name}
        
        await api.put(`characters/${id}`, data)
        alert('Character added!')
        history.push('/characters')
    }

    return (
        <>
            <Tabs />
            <form onSubmit={handleSubmit} id="container2">
                <div className="characterImage">
                    <img src={imageUrl} alt={name} onClick={handleImageClick}/>
                </div>
                <div className="characterInfo">
                    <input
                        className="nameInput"
                        name="name"
                        onChange={handleNameInputChange}
                        placeholder="Name"
                        type="text"
                        value={name}
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

export default Edit