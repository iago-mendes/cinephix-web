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
    id: string
    name: string
    image: string
    type?: {isMovie: boolean, isSeries: boolean, isUniverse: boolean}
    sType?: string
    genres: Array<{id: number, name: string}>
    relations: Array<{celebrity: CelebrityCharacter, character: CelebrityCharacter}>
}

const defaultInfo =
{
    id: 'default',
    name: 'default',
    image: 'default',
    genres: [{id: 0, name: ''}],
    relations: [{celebrity: defaultCelebrityCharacter, character: defaultCelebrityCharacter}]
}

const View = () =>
{
    const {id} = useParams<{id: string}>()
    const [info, setInfo] = useState<Info>(defaultInfo)

    useEffect(() => // collect media info
    {
        api.get(`/media/${id}`).then(res =>
        {
            let data: Info = res.data
            let type = 'default'

            if (data.type !== undefined)
            {
                if (data.type.isMovie) type = 'Movie'
                else if (data.type.isSeries) type = 'Series'
                else if (data.type.isUniverse) type = 'Universe'
            }

            setInfo(
            {
                id: data.id,
                name: data.name,
                image: data.image,
                sType: type,
                genres: data.genres,
                relations: data.relations
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
                        <h2>Type: {info.sType}</h2>
                    </div>
                    <ul className="classification">
                        <h2>Genres</h2>
                        {info.genres.map(genre => (
                            <li key={genre.id}>
                                <h3>{genre.name}</h3>
                            </li>
                        ))}
                    </ul>
                    <ul className="celebrityCharacter">
                        <h2>Celebrities & Characters</h2>
                        {info.relations.map(({celebrity, character}) => (
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