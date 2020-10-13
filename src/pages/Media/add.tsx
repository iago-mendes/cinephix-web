import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import { FiPlusCircle, FiSend } from 'react-icons/fi'

import Tabs from '../../components/Tabs'
import Dropzone from '../../components/Dropzone'
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

const defaultType =
{
    isMovie: false,
    isSeries: false,
    isUniverse: false
}

const Add = () =>
{
    const [classificationsList, setClassificationsList] = useState<Classification[]>([defaultClassification])

    const [selectedFile, setSelectedFile] = useState<File>()
    const [name, setName] = useState('')
    const [type, setType] = useState<Type>(defaultType)
    const [classifications, setClassifications] = useState<Classification[]>(
    [{
        id: 0,
        name: ''
    }])

    const history = useHistory()

    useEffect(() => // collect list of classifications
    {
        api.get('classifications').then(res => setClassificationsList(res.data))
    }, [])

    function handleNameInputChange(event: ChangeEvent<HTMLInputElement>)
    {
        setName(event.target.value)
    }

    function handleTypeSelection(event: ChangeEvent<HTMLInputElement>)
    {
        let value = type

        if (event.target.name === 'isMovie') value.isMovie = event.target.checked
        else if (event.target.name === 'isSeries') value.isSeries = event.target.checked
        else if (event.target.name === 'isUniverse') value.isUniverse = event.target.checked
        
        setType(value)
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

        const data = new FormData()
        data.append('name', name)
        if (selectedFile) data.append('image', selectedFile)
        data.append('isMovie', String(type.isMovie))
        data.append('isSeries', String(type.isSeries))
        data.append('isUniverse', String(type.isUniverse))
        data.append('classifications_ids', classificationIds.join(','))

        await api.post('media', data)
        alert('Media added!')
        history.push('/media')
    }

    return (
        <>
            <Tabs />
            <form onSubmit={handleSubmit} autoComplete="off" id="container2">
                <div className="mediaImage">
                    <Dropzone fileUploaded='' onFileUploaded={setSelectedFile}/>
                </div>
                <div className="mediaInfo">
                    <input
                        type="text"
                        placeholder="Name"
                        className="nameInput"
                        name="name"
                        onChange={handleNameInputChange}
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
                                <select onChange={(event) => handleSelectClassification(index, event)}>
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

export default Add