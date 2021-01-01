import { SET_ERRORS, RESET_ERRORS, RESET_SUCCESS_MSG, SET_SUCCESS_MSG } from '../utils/Constant'

const initialState = {
    error : [],
    successMsg : []
}
const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUCCESS_MSG:
            return {
                ...state,
                successMsg: [...state.successMsg, action.payload]
            }
        
        case SET_ERRORS:
            return {
                ...state,
                error: [...state.error, action.payload]
            }

        case RESET_SUCCESS_MSG:
            return {
                ...state,
                successMsg: state.successMsg.filter(msg => msg.id !== action.payload)
            }

        case RESET_ERRORS:
            return {
                ...state,
                error: state.error.filter(error => error.id !== action.payload)
            }
        
        default:
            return state
    }
} 

export default alertReducer