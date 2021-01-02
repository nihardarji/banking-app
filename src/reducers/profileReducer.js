import { GET_PROFILE, SIGN_OUT, UPDATE_PROFILE } from "../utils/Constant";

const initialState = {
    profileInfo: null
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profileInfo: action.payload
            }
        
        case SIGN_OUT:
            return {
                profileInfo: null
            }
        
        default:
            return state
    }
}

export default profileReducer