import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import './styles.css'
import Tabs from '../../components/Tabs'
import api from '../../services/api'

interface CelebrityMedia
{
    id: number
    name: string
    image: string
}

const defaultCelebrityMedia =
{
    id: 0,
    name: 'default',
    image: 'default'
}

interface Info
{
    name: string
    image: string
    celebrities_media: Array<{celebrity: CelebrityMedia, media: CelebrityMedia}>
}

const defaultInfo =
{
    name: 'default',
    image: 'default',
    celebrities_media: [{celebrity: defaultCelebrityMedia, media: defaultCelebrityMedia}]
}

const View = () =>
{
    const {id} = useParams()
    const [info, setInfo] = useState<Info>(defaultInfo)

    useEffect(() =>
    {
        api.get(`characters/${id}`).then(res => setInfo(res.data))
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
                        {info.celebrities_media.map(({celebrity, media}) => (
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