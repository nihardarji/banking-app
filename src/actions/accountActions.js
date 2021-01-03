import Axios from "axios"
import { setAuthHeader } from "../utils/Common"
import { GET_ACCOUNT, UPDATE_ACCOUNT } from "../utils/Constant"
import { setErrors } from './Alert'

export const updateTotalBalance = (amountToChange, operation) => async dispatch => {
    dispatch({
        type: UPDATE_ACCOUNT,
        operation,
        amountToChange
    })
}

export const getAccountDetails = () => async (dispatch) => {
    try {
        setAuthHeader()
        const accountDetails = await Axios.get('/account')
        dispatch({
            type : GET_ACCOUNT,
            payload: accountDetails.data
        })
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data))
    }
}

export const addAccountDetails = (account_no, bank_name, ifsc) => async (dispatch) => {
    try {
        setAuthHeader()
        const account = await Axios.post('/account', {
            account_no,
            bank_name,
            ifsc
        })
        console.log('accounttttt', account)
        dispatch({
            type : GET_ACCOUNT,
            payload: account.data
        })
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data))
    }
}

export const updateAccountDetails = (ifsc) => async (dispatch) => {
    try {
        setAuthHeader()
        const accountDetails = await Axios.patch('/account', {
            ifsc
        })
        dispatch({
            type : GET_ACCOUNT,
            payload: accountDetails.data
        })
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data))
    }
}