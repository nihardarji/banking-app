import { GET_PROFILE, UPDATE_PROFILE } from "../utils/Constant";

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

        default:
            return state
    }
}

export default profileReducer