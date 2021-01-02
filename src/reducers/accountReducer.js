import { UPDATE_ACCOUNT, GET_ACCOUNT, SIGN_OUT } from '../utils/Constant';

const accountReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ACCOUNT:
            return {
                ...action.payload.account
            }
        
        case UPDATE_ACCOUNT:
            if( action.operation === 'withdraw'){
                return {
                    ...state,
                    total_balance: +state.total_balance - +action.amountToChange
                }
            } else if (action.operation === 'deposit') {
                return {
                    ...state,
                    total_balance: +state.total_balance  + +action.amountToChange
                }
            }
        case SIGN_OUT:
            return {}
        default:
            return state
    }
}

export default accountReducer