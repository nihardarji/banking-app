import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoutes = ({ component: Component, auth,  ...rest}) => {

    const { isAuthenticated } = auth
    return (
        <Route { ...rest } render ={ props => !isAuthenticated ? (
            <Redirect to = '/' />
        ): (
            <Component { ...props } />
        )} />
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(PrivateRoutes)
