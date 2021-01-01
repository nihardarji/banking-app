import { SIGN_IN, SIGN_OUT } from '../utils/Constant'

const initialState = {
    userInfo: null,
    isAuthenticated: false
}

const authReducer = ( state= initialState, action ) => {
    switch(action.type) {
        case SIGN_IN:
            return {
                ...state,
                userInfo: action.payload,
                isAuthenticated: true
            }

        case SIGN_OUT:
            localStorage.removeItem('user_token')
            return {
                ...state,
                userInfo: null,
                isAuthenticated: false
            }

        default:
            return state
    }
}

export default authReducer