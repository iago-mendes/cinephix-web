import React, { useState, useEffect, ChangeEvent } from 'react'

import { FiPlusCircle, FiSave, FiTrash2 } from 'react-icons/fi'

import Tabs from '../../components/Tabs'
import api from '../../services/api'
import dynamicSort from '../../functions/sort'

interface Item
{
    id: number
    name: string
}

const defaultItem =
{
    id: 0,
    name: ''
}

const Classifications = () =>
{
    const [list, setList] = useState<Item[]>([defaultItem])

    useEffect(() =>
    {
        api.get('classifications').then(res =>
        {
            let sortedList = res.data.sort(dynamicSort('name'))
            setList(sortedList)
        })
    }, [])

    function handleAdd()
    {
        setList([...list, defaultItem])
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>)
    {
        const id = Number(event.target.name)
        let values = list
        values.map(value =>
        {
            if (value.id === id) value.name = event.target.value
        })

        setList(values)
    }

    async function handleSave(id: number, name: string)
    {
        const data = {name: name}
        if (id === 0 && name !== '') await api.post('classifications', data)
        else if (id !==0 && name !== '') await api.put(`classifications/${id}`, data)
        alert('Classification saved!')
        await api.get('classifications').then(res =>
        {
            let sortedList = res.data.sort(dynamicSort('name'))
            setList(sortedList)
        })
    }

    async function handleDelete(id: number)
    {
        await api.delete(`classifications/${id}`)
        alert('Classification deleted!')
        await api.get('classifications').then((res) =>
        {
            let sortedList = res.data.sort(dynamicSort('name'))
            setList(sortedList)
        })
    }

    return (
        <>
            <Tabs />
            <div id="container">
                <h1>Classifications</h1>
                <div id="listContainer">
                <div id="add">
                    <button onClick={handleAdd}>
                        <FiPlusCircle />
                        <span>Add</span>
                    </button>
                </div>
                <div id="list">
                    <ul>
                        {list.map((item, index) => (
                            <li key={index} >
                                <div id="info">
                                    <input
                                        name={String(item.id)}
                                        onChange={handleNameChange}
                                        placeholder="Name"
                                        type="text"
                                        value={item.name}
                                    />
                                </div>
                                <div id="buttons">
                                    <button
                                        onClick={() => handleSave(item.id, item.name)}
                                        title="Save"
                                        type="button"
                                    >
                                        <FiSave />
                                    </button>
                                    <button
                                        id="deleteButton"
                                        onClick={() => handleDelete(item.id)}
                                        title="Delete"
                                        type="button"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            </div>
        </>
    )
}

export default Classifications