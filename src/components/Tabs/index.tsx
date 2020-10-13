import React from 'react'
import {Link} from 'react-router-dom'

import './styles.css'
import logo from '../../assets/logo-shadow.svg'

const Tabs = () =>
{
    return (
        <div id="tabsContainer">
            <div id="logoTabs">
                <Link to="/" id="logoLink">
                    <img src={logo} alt="logo"/>
                </Link>
            </div>
            <div id="menu">
                <ul>
                    <li>
                        <Link to='/celebrities' className="itemLink">Celebrities</Link>
                    </li>
                    <li>
                        <Link to='/characters' className="itemLink">Characters</Link>
                    </li>
                    <li>
                        <Link to='/media' className="itemLink">Media</Link>
                    </li>
                    <li>
                        <Link to='/classifications' className="itemLink">Classifications</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Tabs