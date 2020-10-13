import React from 'react'
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'

import isAdmin from './functions/admin'

import Login from './pages/Login'
import Home from './pages/Home'
import Classifications from './pages/Classifications'

import Celebrities from './pages/Celebrities'
import ViewCelebritiy from './pages/Celebrities/view'
import AddCelebrity from './pages/Celebrities/add'
import EditCelebrity from './pages/Celebrities/edit'

import Characters from './pages/Characters'
import ViewCharacter from './pages/Characters/view'
import AddCharacter from './pages/Characters/add'
import EditCharacter from './pages/Characters/edit'

import Media from './pages/Media'
import ViewMedia from './pages/Media/view'
import AddMedia from './pages/Media/add'
import EditMedia from  './pages/Media/edit'

const ExactRoute = ({component: Component, path, exact}: {component: any, path: string, exact: any}) =>
{
    return (
        <Route
            exact
            path={path}
            render={props => isAdmin() ? <Component {...props} /> : (
                <Redirect to={{pathname: '/login', state: {from: props.location}}} />
            )}
        />
    )
}
const CRUDRoute = ({component: Component, path}: {component: any, path: string}) =>
    {
        return (
            <Route
                path={path}
                render={props => isAdmin() ? <Component {...props} /> : (
                    <Redirect to={{pathname: '/login', state: {from: props.location}}} />
                )}
            />
        )
    }

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/login' component={Login} />
            <ExactRoute exact path='/' component={Home} />
            <ExactRoute exact path='/celebrities' component={Celebrities} />
                <CRUDRoute path='/celebrities/view/:id' component={ViewCelebritiy} />
                <CRUDRoute path='/celebrities/add' component={AddCelebrity} />
                <CRUDRoute path='/celebrities/edit/:id' component={EditCelebrity} />
            <ExactRoute exact path='/characters' component={Characters} />
                <CRUDRoute path='/characters/view/:id' component={ViewCharacter} />
                <CRUDRoute path='/characters/add' component={AddCharacter} />
                <CRUDRoute path='/characters/edit/:id' component={EditCharacter} />
            <ExactRoute exact path='/media' component={Media} />
                <CRUDRoute path='/media/view/:id' component={ViewMedia} />
                <CRUDRoute path='/media/add' component={AddMedia} />
                <CRUDRoute path='/media/edit/:id' component={EditMedia} />
            <CRUDRoute path='/classifications' component={Classifications} />
        </Switch>
    </BrowserRouter>
)

export default Routes