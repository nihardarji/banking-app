import { signIn } from "../actions/Auth"
import store from "../store/store"
import jwt_decode from 'jwt-decode'
import Axios from "axios"
import { initiateGetProfile } from "../actions/Profile"

export const validateFields = fieldsToValidate => {
    return fieldsToValidate.every((field) => Object.values(field)[0] !== '')
}

export const maintainSession = () => {
    const user_token = localStorage.getItem('user_token')
    if (user_token) {
        const decoded = jwt_decode(user_token)
        updateStore(decoded)
    }
}

export const updateStore = (user) => {
    const { userid, email } = user
    store.dispatch(
        signIn({
            userid,
            email,
            token: localStorage.getItem('user_token')
        })
    )
    store.dispatch(initiateGetProfile(email))
}

export const setAuthHeader = () => {
    const token = localStorage.getItem('user_token');
    if (token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}
  
export const removeAuthHeader = () => {
    delete Axios.defaults.headers.common['Authorization'];
}