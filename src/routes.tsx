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

// const ExactRoute = ({component: Component, path, exact}: {component: any, path: string, exact: any}) =>
// {
//     return (
//         <Route
//             exact
//             path={path}
//             render={props => isAdmin() ? <Component {...props} /> : (
//                 <Redirect to={{pathname: '/login', state: {from: props.location}}} />
//             )}
//         />
//     )
// }
// const CRUDRoute = ({component: Component, path}: {component: any, path: string}) =>
// {
//     return (
//         <Route
//             path={path}
//             render={props => isAdmin() ? <Component {...props} /> : (
//                 <Redirect to={{pathname: '/login', state: {from: props.location}}} />
//             )}
//         />
//     )
// }

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/login' component={Login} />
            <Route exact path='/' component={Home} />
            <Route exact path='/celebrities' component={Celebrities} />
                <Route path='/celebrities/view/:id' component={ViewCelebritiy} />
                <Route path='/celebrities/add' component={AddCelebrity} />
                <Route path='/celebrities/edit/:id' component={EditCelebrity} />
            <Route exact path='/characters' component={Characters} />
                <Route path='/characters/view/:id' component={ViewCharacter} />
                <Route path='/characters/add' component={AddCharacter} />
                <Route path='/characters/edit/:id' component={EditCharacter} />
            <Route exact path='/media' component={Media} />
                <Route path='/media/view/:id' component={ViewMedia} />
                <Route path='/media/add' component={AddMedia} />
                <Route path='/media/edit/:id' component={EditMedia} />
            <Route path='/classifications' component={Classifications} />
        </Switch>
    </BrowserRouter>
)

export default Routes