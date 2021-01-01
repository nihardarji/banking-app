import { v4 } from "uuid"
import { SET_ERRORS, RESET_ERRORS, RESET_SUCCESS_MSG, SET_SUCCESS_MSG } from "../utils/Constant"


export const setErrors = (error, timeout = 5000) => dispatch => {
    const id = v4()
    dispatch({
        type: SET_ERRORS,
        payload: {error, id}
    })
    
    setTimeout(() => dispatch({ type: RESET_ERRORS, payload: id }), timeout )
}

export const setSuccessMsg = (successMsg, timeout = 5000) => dispatch => {
    const id = v4()
    dispatch({
        type: SET_SUCCESS_MSG,
        payload: { successMsg, id}
    })
    setTimeout(() => dispatch({ type: RESET_SUCCESS_MSG, payload: id }), timeout )
}