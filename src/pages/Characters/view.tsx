import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import './styles.css'
import Tabs from '../../components/Tabs'
import api from '../../services/api'

interface CelebrityMedia
{
    id: string
    name: string
    image: string
}

const defaultCelebrityMedia =
{
    id: 'default',
    name: 'default',
    image: 'default'
}

interface Info
{
    id: string
    name: string
    image: string
    relations: Array<{celebrity: CelebrityMedia, media: CelebrityMedia}>
}

const defaultInfo =
{
    id: 'default',
    name: 'default',
    image: 'default',
    relations: [{celebrity: defaultCelebrityMedia, media: defaultCelebrityMedia}]
}

const View = () =>
{
    const {id} = useParams<{id: string}>()
    const [info, setInfo] = useState<Info>(defaultInfo)

    useEffect(() =>
    {
        api.get(`/characters/${id}`).then(res => setInfo(res.data))
    }, [id])

    return (
        <>
            <Tabs />
            <div id="container2">
                <div className="characterImage">
                    <img src={info.image} alt={info.name}/>
                </div>
                <div className="characterInfo">
                    <h1>{info.name}</h1>
                    <ul>
                        <h2>Celebrities & Media</h2>
                        {info.relations.map(({celebrity, media}) => (
                            <li className="celebrityMedia" key={`${celebrity.id}-${media.id}`}>
                                <div className="celebrity">
                                    <img src={celebrity.image} alt={celebrity.name}/>
                                    <h3>{celebrity.name}</h3>
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