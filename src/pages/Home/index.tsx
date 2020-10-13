import React, { useState, useEffect } from 'react'

import './styles.css'
import Tabs from '../../components/Tabs'
import api from '../../services/api'

const Home = () =>
{
    const [celebrities, setCelebrities] = useState<number>(0)
    const [characters, setCharacters] = useState<number>(0)
    const [media, setMedia] = useState<number>(0)
    const [classifications, setClassifications] = useState<number>(0)

    useEffect(() => // collect number of items registred
    {
        api.get('celebrities').then(res => setCelebrities(res.data.length))
        api.get('characters').then(res => setCharacters(res.data.length))
        api.get('media').then(res => setMedia(res.data.length))
        api.get('classifications').then(res => setClassifications(res.data.length))
    }, [])

    return (
        <>
            <Tabs />
            <div id="container">
                <h1>Home</h1>
                <ul className="info">
                    <h2>Number of registrations</h2>
                        <li key="celebrities">
                            <div className="category">
                                <h3>Celebrities</h3>
                            </div>
                            <div className="number">
                                <h3>{celebrities}</h3>
                            </div>
                        </li>
                        <li key="characters">
                            <div className="category">
                                <h3>Characters</h3>
                            </div>
                            <div className="number">
                                <h3>{characters}</h3>
                            </div>
                        </li>
                        <li key="media">
                            <div className="category">
                                <h3>Media</h3>
                            </div>
                            <div className="number">
                                <h3>{media}</h3>
                            </div>
                        </li>
                        <li key="classifications">
                            <div className="category">
                                <h3>Classifications</h3>
                            </div>
                            <div className="number">
                                <h3>{classifications}</h3>
                            </div>
                        </li>
                </ul>
            </div>
        </>
    )    
}

export default Home