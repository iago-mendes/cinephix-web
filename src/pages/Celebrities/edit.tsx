import React, {useState, ChangeEvent, useEffect, FormEvent} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import {FiPlusCircle, FiSend} from 'react-icons/fi'

import './styles.css'
import Tabs from '../../components/Tabs'
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

const Edit = () =>
{
    const {id} = useParams()

    const [charactersList, setCharactersList] = useState<CharacterMedia[]>([defaultCharacterMedia])
    const [mediaList, setMediaList] = useState<CharacterMedia[]>([defaultCharacterMedia])

    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [list, setList] = useState<Item[]>([defaultItem])

    const history = useHistory()

    useEffect(() => // collect celebrity info
    {
        api.get(`celebrities/${id}`).then(res =>
        {
            setName(res.data.name)
            setImageUrl(res.data.image)
            const preList: Item[] = res.data.characters_media.map((item: Item) => (
                {
                    character: {id: item.character.id, name: item.character.name},
                    media: {id: item.media.id, name: item.media.name}
                }
            ))
            setList(preList)
        })        
    }, [id])

    useEffect(() => // collect list of characters and media
    {
        api.get('characters').then((res) => setCharactersList(res.data))
        api.get('media').then((res) => setMediaList(res.data))
    }, [])

    function handleImageClick()
    {
        return alert('It is not possible to edit the image. If you want to change it, delete the celebrity and add a new one.')
    }

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
        const addedItem: Item =
        {
            character: {id: 0, name: ''},
            media: {id: 0, name: ''}
        }
        setList([...list, addedItem])
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

        const data = 
        {
            name: name,
            characters_ids: characterIds.join(','),
            medias_ids: mediaIds.join(',')
        }
        
        await api.put(`/celebrities/${id}`, data).catch(function (error)
        {
            if (error.response)
            {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request)   console.log(error.request)
            else console.log('Error', error.message);
            console.log(error.config);
            console.log('[data]', data)
        })
        alert('Celebrity edited!')
        history.push('/celebrities')
    }

    return (
        <>
            <Tabs />
            <form onSubmit={handleSubmit} autoComplete="off" id="container2">
                <div className="celebrityImage">
                    <img src={imageUrl} alt={name} onClick={handleImageClick}/>
                </div>
                <div className="celebrityInfo">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
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
                                            value={item.character.id}
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
                                            value={item.media.id}
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

export default Edit