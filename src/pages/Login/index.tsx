import React, {useState, useEffect, ChangeEvent} from 'react'
import { Link } from 'react-router-dom'

import {FiLogIn} from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'
import logo from '../../assets/logo-shadow.svg'

interface Password
{
  name: string
  password: string
}

const Login = () =>
{
    const [password, setPassword] = useState<Password>({name: 'a', password: '1'})
    const [typedPassword, setTypedPassword] = useState<Password>({name: '', password: ''})

    useEffect(() => //collect admin password
    {
        api.get('passwords?ids=1').then(res => setPassword(res.data[0]))
    }, [])

    function handleTypedPassword(event: ChangeEvent<HTMLInputElement>)
    {
        const {name, value} = event.target
        setTypedPassword({name, password: value})
    }

    function handleSubmit()
    {
        if(typedPassword.password === password.password) sessionStorage.setItem('isAdmin', 'yes')
        else sessionStorage.setItem('isAdmin', 'no')
    }

    return (
        <div id="loginContainer">
            <div id="logoLogin">
                <img src={logo} alt="logo" />
            </div>
            <div id="prompt">
                <h1>This website manages the data for the app Cinephix. In order to have this access, insert the admin password below.</h1>
            </div>
            <div id="password">
                <input type="password" name='user' onChange={handleTypedPassword} />
                <Link to='/' id='submitLink'>
                    <button type='submit' onClick={handleSubmit}>
                        <FiLogIn />
                        <span>Submit</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Login