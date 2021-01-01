import { createBrowserHistory } from 'history'
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Login from '../components/Login'
import Profile from '../components/Profile'
import Register from '../components/Register'
import PrivateRoutes from './PrivateRoutes'

// export const history = createBrowserHistory()

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/' component={Login} exact />
                    <Route path='/register' component={Register} />
                    <PrivateRoutes path='/profile' component={Profile} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AppRouter)
