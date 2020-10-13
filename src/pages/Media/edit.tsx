import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'

import { FiPlusCircle, FiSend } from 'react-icons/fi'

import Tabs from '../../components/Tabs'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

interface Classification
{
    id: number
    name: string
}

const defaultClassification =
{
    id: 0,
    name: ''
}

interface Type
{
    isMovie: boolean
    isSeries: boolean
    isUniverse: boolean
}

interface receivedInfo
{
    name: string
    image: string
    type: {isMovie: boolean, isSeries: boolean, isUniverse: boolean}
    classifications: Array<{id: number, name: string}>
    celebrities_characters: Array<{celebrity: {id: number, name: string, image: string}, character: {id: number, name: string, image: string}}>
}

const Edit = () =>
{
    const {id} = useParams()

    const [classificationsList, setClassificationsList] = useState<Classification[]>([defaultClassification])

    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [type, setType] = useState<Type>({
        isMovie: false,
        isSeries: false,
        isUniverse: false
    })
    const [classifications, setClassifications] = useState<Classification[]>(
    [{
        id: 0,
        name: ''
    }])

    const history = useHistory()

    useEffect(() => // collect media info
    {
        api.get(`media/${id}`).then(res =>
        {
            const info: receivedInfo = res.data
            setName(res.data.name)
            setImageUrl(res.data.image)
            setClassifications(res.data.classifications)
        })
    }, [id])

    useEffect(() => // collect list of classifications
    {
        api.get('classifications').then(res => setClassificationsList(res.data))
    }, [])

    function handleImageClick()
    {
        return alert('It is not possible to edit the image. If you want to change it, delete the media and add a new one.')
    }

    function handleNameInputChange(event: ChangeEvent<HTMLInputElement>)
    {
        setName(event.target.value)
    }

    async function handleTypeSelection(event: ChangeEvent<HTMLInputElement>)
    {
        let value = type

        if (event.target.name === 'isMovie') value.isMovie = event.target.checked
        else if (event.target.name === 'isSeries') value.isSeries = event.target.checked
        else if (event.target.name === 'isUniverse') value.isUniverse = event.target.checked

        await setType(value)
    }

    function handleSelectClassification(index: number, event: ChangeEvent<HTMLSelectElement>)
    {
        const classificationId = Number(event.target.value)
        let classificationName = ''

        let values = [...classifications]
        classificationName = String(classificationsList.map(classification =>
        {
            if (classification.id === classificationId) return classification.name
            else return ''
        }))
        values[index] = {id: classificationId, name: classificationName}

        setClassifications(values)
    }

    function handleAddClassification()
    {
        setClassifications([...classifications, defaultClassification])
    }

    async function handleSubmit(event: FormEvent)
    {
        event.preventDefault()

        let classificationIds: number[] = []
        classifications.map(classification =>
        {
            if (classification.id !== 0) classificationIds.push(classification.id)
        })

        const data =
        {
            name: name,
            isMovie: type.isMovie,
            isSeries: type.isSeries,
            isUniverse: type.isUniverse,
            classifications_ids: classificationIds.join(',')
        }

        await api.put(`/media/${id}`, data).catch(function (error)
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
        alert('Media edited!')
        history.push('/media')
    }

    return (
        <>
            <Tabs />
            <form onSubmit={handleSubmit} autoComplete="off" id="container2">
                <div className="mediaImage">
                    <img src={imageUrl} alt={name} onClick={handleImageClick}/>
                </div>
                <div className="mediaInfo">
                    <input
                        className="nameInput"
                        name="name"
                        onChange={handleNameInputChange}
                        placeholder="Name"
                        type="text"
                        value={name}
                    />
                    <div className="mediaTypeSelection">
                        <div className="type">
                            <h3>Movie</h3>
                            <input
                                name="isMovie"
                                onChange={handleTypeSelection}
                                type="checkbox"
                            />
                        </div>
                        <div className="type">
                            <h3>Series</h3>
                            <input
                                name="isSeries"
                                onChange={handleTypeSelection}
                                type="checkbox"
                            />
                        </div>
                        <div className="type">
                            <h3>Universe</h3>
                            <input
                                name="isUniverse"
                                onChange={handleTypeSelection}
                                type="checkbox"
                            />
                        </div>
                    </div>
                    <ul className="classificationSelection">
                        <h2>Classifications</h2>
                        {classifications.map((classification, index) => (
                            <li key={index}>
                                <select
                                    onChange={(event) => handleSelectClassification(index, event)}
                                    value={classification.id}
                                >
                                    <option value="0">Choose a classification</option>
                                    {classificationsList.map(({id, name}) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </li>
                        ))}
                        <button type="button" onClick={handleAddClassification}>
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