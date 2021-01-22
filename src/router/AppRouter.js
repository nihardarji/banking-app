import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Account from '../components/Account'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Profile from '../components/Profile'
import Register from '../components/Register'
import PrivateRoutes from './PrivateRoutes'

// export const history = createBrowserHistory()

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar/>
                <Switch>
                    <Route path='/' component={Login} exact />
                    <Route path='/register' component={Register} />
                    <PrivateRoutes path='/profile' component={Profile} />
                    <PrivateRoutes path='/account' component={Account} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AppRouter)
