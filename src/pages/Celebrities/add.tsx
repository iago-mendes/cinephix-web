import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import {useHistory} from 'react-router-dom'

import { FiPlusCircle, FiSend } from 'react-icons/fi'

import './styles.css'
import Tabs from '../../components/Tabs'
import Dropzone from '../../components/Dropzone'
import api from '../../services/api'

interface CharacterMedia
{
    id: number
    name: string
}

const defaultCharacterMedia =
{
    id: 0,
    name: ''
}

interface Item
{
    character: {id: number, name: string}
    media: {id: number, name: string}
}

const defaultItem =
{
    character: defaultCharacterMedia,
    media: defaultCharacterMedia
}

const Add = () =>
{
    const [charactersList, setCharactersList] = useState<CharacterMedia[]>([defaultCharacterMedia])
    const [mediaList, setMediaList] = useState<CharacterMedia[]>([defaultCharacterMedia])

    const [selectedFile, setSelectedFile] = useState<File>()
    const [name, setName] = useState('')
    const [list, setList] = useState<Item[]>(
    [{
        character: {id: 0, name: ''},
        media: {id: 0, name: ''}
    }])

    const history = useHistory()

    useEffect(() => // collect list of characters and media
    {
        api.get('characters').then((res) => setCharactersList(res.data))
        api.get('media').then((res) => setMediaList(res.data))
    }, [])

    function handleNameInputChange(event: ChangeEvent<HTMLInputElement>)
    {
        setName(event.target.value)
    }

    function handleSelectItem(index: number, event: ChangeEvent<HTMLSelectElement>)
    {
        const itemId = Number(event.target.value)
        let itemName = ''

        const category = String(event.target.name)
        let values = [...list]
        if (category === 'characters')
        {
            itemName = String(charactersList.map(character =>
            {
                if (character.id === itemId) return character.name
                else return ''
            }))
            values[index].character = {id: itemId, name: itemName}
        }
        else if (category === 'media')
        {
            itemName = String(mediaList.map(media =>
            {
                if (media.id === itemId) return media.name
                else return ''
            }))
            values[index].media = {id: itemId, name: itemName}
        }

        setList(values)
    }

    function handleAddItem()
    {
        setList([...list, defaultItem])
    }

    async function handleSubmit(event: FormEvent)
    {
        event.preventDefault()

        let characterIds: number[] = []
        let mediaIds: number[] = []
        list.map(item =>
        {
            if (item.character.id !== 0 && item.media.id !==0)
            {
                characterIds.push(item.character.id)
                mediaIds.push(item.media.id)
            }
            return 'removeWarning'
        })

        const data = new FormData()
        data.append('name', name)
        if (selectedFile)
        {
            data.append('image', selectedFile)
        }
        data.append('characters_ids', characterIds.join(','))
        data.append('medias_ids', mediaIds.join(','))
        
        await api.post('/celebrities', data)
        alert('Celebrity added!')
        history.push('/celebrities')
    }

    return (
        <>
            <Tabs />
            <form onSubmit={handleSubmit} autoComplete="off" id="container2">
                <div className="celebrityImage">
                    <Dropzone fileUploaded='' onFileUploaded={setSelectedFile} />
                </div>
                <div className="celebrityInfo">
                    <input
                        type="text"
                        placeholder="Name"
                        className="nameInput"
                        name="name"
                        onChange={handleNameInputChange}
                    />
                    <ul>
                        <h2>Roles & Media</h2>
                        {list.map((item, index) => (
                                <li key={index} className="charactersMedia">
                                    <div className="characters">
                                        <select
                                            name="characters"
                                            onChange={(event) => handleSelectItem(index, event)}
                                        >
                                            <option value="0">Choose a character</option>
                                            {charactersList.map(character => (
                                                <option
                                                    key={character.id}
                                                    value={character.id}
                                                >
                                                    {character.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="media">
                                        <select
                                            name="media"
                                            onChange={(event) => handleSelectItem(index, event)}
                                        >
                                            <option value="0">Choose a media</option>
                                            {mediaList.map(media => (
                                                <option
                                                    key={media.id}
                                                    value={media.id}
                                                >
                                                    {media.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </li>
                        ))}
                        <button type="button" onClick={handleAddItem}>
                            <FiPlusCircle />
                        </button>
                    </ul>
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