import React, { useState, useEffect } from 'react'

import './styles.css'
import Tabs from '../../components/Tabs'
import List from '../../components/List'
import api from '../../services/api'
import dynamicSort from '../../functions/sort'

interface Media
{
    id: number
    name: string
    image: string
}

const Media = () =>
{
    const [list, setList] = useState([])

    useEffect(() => // collect list of media
    {
        api.get('media').then(res =>
        {
            const sortedList = res.data.sort(dynamicSort('name'))
            setList(sortedList)
        })
    }, [])

    return (
        <>
            <Tabs />
            <div id="container">
                <h1>Media</h1>
                <List baseUrl='/media' list={list} setList={setList} />
            </div>
        </>
    )
}

export default Media