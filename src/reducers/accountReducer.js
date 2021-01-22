import { UPDATE_ACCOUNT, GET_ACCOUNT, SIGN_OUT } from '../utils/Constant';

const accountReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ACCOUNT:
            return {
                ...action.payload.account
            }
        
        case UPDATE_ACCOUNT:
            return {
                ...action.payload
            }
        
        case SIGN_OUT:
            return {}
        
        default:
            return state
    }
}

export default accountReducer