import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import { FiPlusCircle, FiSend } from 'react-icons/fi'

import Tabs from '../../components/Tabs'
import Dropzone from '../../components/Dropzone'
import api from '../../services/api'

interface Genre
{
    id: string
    name: string
}

const defaultGenre =
{
    id: '',
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
    const [genresList, setGenresList] = useState<Genre[]>([defaultGenre])

    const [selectedFile, setSelectedFile] = useState<File>()
    const [name, setName] = useState('')
    const [type, setType] = useState<Type>(defaultType)
    const [genres, setGenres] = useState<Genre[]>([])

    const history = useHistory()

    useEffect(() => // collect list of genres
    {
        api.get('genres').then(res => setGenresList(res.data))
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

    function handleSelectGenre(index: number, event: ChangeEvent<HTMLSelectElement>)
    {
        const genreId = event.target.value
        let genreName = ''

        let values = [...genres]
        genreName = String(genresList.map(genre =>
        {
            if (genre.id === genreId) return genre.name
            else return ''
        }))
        values[index] = {id: genreId, name: genreName}

        setGenres(values)
    }

    function handleAddGenre()
    {
        setGenres([...genres, defaultGenre])
    }

    async function handleSubmit(event: FormEvent)
    {
        event.preventDefault()

        let genreIds: string[] = []
        genres.map(genre =>
        {
            if (genre.id !== '') genreIds.push(genre.id)
        })

        // const data = new FormData()
        // data.append('name', name)
        // if (selectedFile) data.append('image', selectedFile)
        // data.append
        // data.append('genres', genreIds)

        const data = {name, image: selectedFile ? selectedFile : null, type, genres: genreIds}

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
                        {genres.map((genre, index) => (
                            <li key={index}>
                                <select onChange={(event) => handleSelectGenre(index, event)}>
                                    <option value="0">Choose a genre</option>
                                    {genresList.map(({id, name}) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </li>
                        ))}
                        <button type="button" onClick={handleAddGenre}>
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