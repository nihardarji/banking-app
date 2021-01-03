import Axios from 'axios'
import { ADD_TRANSACTION } from '../utils/Constant'
import { updateTotalBalance } from './accountActions'
import { setErrors } from './Alert'

export const depositAmount = (account_id, deposit_amount) => async dispatch => {
    try {
        await Axios.post(`/deposit/${account_id}`, { deposit_amount })
        const transaction = { deposit_amount, withdraw_amount: null}
        dispatch({
            type: ADD_TRANSACTION,
            payload: transaction
        })

        dispatch(updateTotalBalance(deposit_amount, 'deposit'))
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data))
    }
}

export const withdrawAmount = (account_id, withdraw_amount) => async dispatch => {
    try {
        await Axios.post(`/withdraw/${account_id}`, { withdraw_amount })
        const transaction = { withdraw_amount, deposit_amount: null}
        dispatch({
            type: ADD_TRANSACTION,
            payload: transaction
        })

        dispatch(updateTotalBalance(withdraw_amount, 'withdraw'))
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data))
    }
}