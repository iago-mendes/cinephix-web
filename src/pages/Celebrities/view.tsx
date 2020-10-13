import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

import './styles.css'
import Tabs from '../../components/Tabs'
import api from '../../services/api'

interface Character
{
    id: number
    name: string
    image: string
}

const defaultCharacter =
{
    id: 0,
    name: 'default',
    image: 'default'
}

interface Media
{
    id: number
    name: string
    image: string
}

const defaultMedia =
{
    id: 0,
    name: 'default',
    image: 'default'
}

interface Info
{
    name: string
    image: string
    characters_media: Array<{character: Character, media: Media}>
}

const defaultInfo =
{
    name: 'default',
    image: 'default',
    characters_media: [{character: defaultCharacter, media: defaultMedia}]
}

const View = () =>
{
    const {id} = useParams()
    const [info, setInfo] = useState<Info>(defaultInfo)

    useEffect(() => // collect celebrity info
    {
        api.get(`/celebrities/${id}`).then(res => setInfo(res.data))
    }, [id])

    return (
        <>
            <Tabs />
            <div id="container2">
                <div className="celebrityImage">
                    <img src={info.image} alt=""/>
                </div>
                <div className="celebrityInfo">
                    <h1>{info.name}</h1>
                    <ul>
                        <h2>Roles & Media</h2>
                        {info.characters_media.map(({character, media}) => (
                            <li className="charactersMedia" key={`${character.id}-${media.id}`}>
                                <div className="characters">
                                    <img src={character.image} alt={character.name}/>
                                    <h3>{character.name}</h3>
                                </div>
                                <div className="media">
                                    <img src={media.image} alt={media.name}/>
                                    <h3>{media.name}</h3>
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