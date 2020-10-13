import React from 'react'

import {FiEye, FiEdit2, FiTrash2, FiPlusCircle} from 'react-icons/fi'

import './styles.css'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import dynamicSort from '../../functions/sort'

interface Item
{
    id: number,
    name: string,
    image: string
}

interface Props
{
    baseUrl: string,
    list: Item[],
    setList: Function
}

const List: React.FC<Props> = ({baseUrl, list, setList}) =>
{
    async function handleDelete(id: number)
    {
        const urlDelete = String(baseUrl + '/' + id)
        const urlGet = String(baseUrl)
        await api.delete(urlDelete)
        alert('Successfully deleted!')
        await api.get(urlGet).then((res) =>
        {
            let sortedList = res.data.sort(dynamicSort('name'))
            setList(sortedList)
        })
    }

    return (
        <div id="listContainer">
            <div id="add">
                <Link to={baseUrl + '/add'} id="addLink">
                    <button onClick={() => {}}>
                        <FiPlusCircle />
                        <span>Add</span>
                    </button>
                </Link>
            </div>
            <div id="list">
                <ul>
                    {list.map((item: any) => (
                        <li key={item.id} >
                            <div id="info">
                                <img src={item.image} alt={item.name}/>
                                <span>{item.name}</span>
                            </div>
                            <div id="buttons">
                                <Link to={baseUrl + '/view/' + item.id}>
                                    <button type='button' onClick={() => {}}>
                                        <FiEye />
                                    </button>
                                </Link>
                                <Link to={baseUrl + '/edit/' + item.id}>
                                    <button type='button' onClick={() => {}}>
                                        <FiEdit2 />
                                    </button>
                                </Link>
                                <button type='button' onClick={() => handleDelete(item.id)} id="deleteButton">
                                    <FiTrash2 />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default List