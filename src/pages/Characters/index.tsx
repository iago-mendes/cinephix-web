import React, { useState, useEffect } from 'react'

import './styles.css'
import Tabs from '../../components/Tabs'
import List from '../../components/List'
import api from '../../services/api';
import dynamicSort from '../../functions/sort'

interface Character
{
    id: number
    name: string
    image: string
}

const Characters = () =>
{
    const [list, setList] = useState<Character[]>([])

    useEffect(() => // collect list of characters
    {
        api.get('characters').then(res =>
        {
            const sortedList = res.data.sort(dynamicSort('name'))
            setList(sortedList)
        })
    }, [])

    return (
        <>
            <Tabs />
            <div id="container">
                <h1>Characters</h1>
                <List baseUrl='/characters' list={list} setList={setList} />
            </div>
        </>
    )
}

export default Characters