import React, {useState, useEffect} from 'react'

import './styles.css'
import Tabs from '../../components/Tabs'
import List from '../../components/List'
import api from '../../services/api'
import dynamicSort from '../../functions/sort'

interface Celebrity
{
    id: number,
    name: string,
    image: string
}

const Celebrities = () =>
{
    const [list, setList] = useState<Celebrity[]>([])

    useEffect(() => // collect list of celebrities
    {
        api.get('celebrities').then(res =>
        {
            let sortedList = res.data.sort(dynamicSort('name'))
            setList(sortedList)
        })
    }, [])

    return (
        <>
            <Tabs />
            <div id="container">
                <h1>Celebrities</h1>
                <List baseUrl='/celebrities' list={list} setList={setList} />
            </div>
        </>
    )
}

export default Celebrities