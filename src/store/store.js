import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import alertReducer from '../reducers/alertReducer';
import profileReducer from '../reducers/profileReducer';
import accountReducer from '../reducers/accountReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    combineReducers({
        auth: authReducer,
        alert: alertReducer,
        profile: profileReducer,
        account: accountReducer
    }),
    composeEnhancer(applyMiddleware(thunk))
)

export default store