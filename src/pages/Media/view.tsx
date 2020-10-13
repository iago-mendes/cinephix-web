import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import './styles.css'
import Tabs from '../../components/Tabs'
import api from '../../services/api'

interface CelebrityCharacter
{
    id: number
    name: string
    image: string
}

const defaultCelebrityCharacter =
{
    id: 0,
    name: '',
    image: ''
}

interface Info
{
    name: string
    image: string
    type: string
    classifications: Array<{id: number, name: string}>
    celebrities_characters: Array<{celebrity: CelebrityCharacter, character: CelebrityCharacter}>
}

interface receivedInfo
{
    name: string
    image: string
    type: {isMovie: boolean, isSeries: boolean, isUniverse: boolean}
    classifications: Array<{id: number, name: string}>
    celebrities_characters: Array<{celebrity: CelebrityCharacter, character: CelebrityCharacter}>
}

const defaultInfo =
{
    name: 'default',
    image: 'default',
    type: 'default',
    classifications: [{id: 0, name: ''}],
    celebrities_characters: [{celebrity: defaultCelebrityCharacter, character: defaultCelebrityCharacter}]
}

const View = () =>
{
    const {id} = useParams()
    const [info, setInfo] = useState<Info>(defaultInfo)

    useEffect(() => // collect media info
    {
        api.get(`/media/${id}`).then(res =>
        {
            let data: receivedInfo = res.data
            let type = ''
            if (data.type.isMovie) type = 'Movie'
            else if (data.type.isSeries) type = 'Series'
            else if (data.type.isUniverse) type = 'Universe'

            setInfo(
            {
                name: data.name,
                image: data.image,
                type: type,
                classifications: data.classifications,
                celebrities_characters: data.celebrities_characters
            })
        })
    }, [id])

    return (
        <>
            <Tabs />
            <div id="container2">
                <div className="mediaImage">
                    <img src={info.image} alt={info.name}/>
                </div>
                <div className="mediaInfo">
                    <h1>{info.name}</h1>
                    <div className="mediaType">
                        <h2>Type: {info.type}</h2>
                    </div>
                    <ul className="classification">
                        <h2>Classifications</h2>
                        {info.classifications.map(classification => (
                            <li key={classification.id}>
                                <h3>{classification.name}</h3>
                            </li>
                        ))}
                    </ul>
                    <ul className="celebrityCharacter">
                        <h2>Celebrities & Characters</h2>
                        {info.celebrities_characters.map(({celebrity, character}) => (
                            <li key={`${celebrity.id}-${character.id}`}>
                                <div className="celebrity">
                                    <img src={celebrity.image} alt={celebrity.name}/>
                                    <h3>{celebrity.name}</h3>
                                </div>
                                <div className="character">
                                    <img src={character.image} alt={character.name}/>
                                    <h3>{character.name}</h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default View