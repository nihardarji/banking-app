import Axios from 'axios'
import { removeAuthHeader, setAuthHeader } from '../utils/Common'
import { SIGN_IN, SIGN_OUT } from '../utils/Constant'
import { setErrors, setSuccessMsg } from './Alert'
import { initiateGetProfile } from './Profile'

export const initiateLogin = (email, password) => async dispatch => {
    try {
        const result = await Axios.post(`/signin`, {
            email,
            password
        })
        const user = result.data
        console.log('initiateLogin',user)
        localStorage.setItem('user_token', user.token)

        dispatch({
            type: SIGN_IN,
            payload: user
        })
        dispatch(initiateGetProfile(user.email))
    } catch (error) {
        console.error(error)
        dispatch(setErrors(error.response.data))
    }
}

export const signIn = (user) => dispatch => {
    dispatch({
        type: SIGN_IN,
        payload: user
    })
}

export const registerUser = (data) => async dispatch => {
    try {
        await Axios.post(`/signup`, data)
        dispatch(setSuccessMsg('User Registerd Successfully'))
        return { success: true}
    } catch (error) {
        dispatch(setErrors(error.response.data))
        return { success: false}
    }
}

export const signOut = () => ({
    type: SIGN_OUT
})
  
export const logout = () => async (dispatch) => {
        try {
            setAuthHeader()
            await Axios.post(`/logout`)
            removeAuthHeader()
            localStorage.removeItem('user_token')
            return dispatch(signOut())
        } catch (error) {
            error.response && dispatch(setErrors(error.response.data))
    }
}