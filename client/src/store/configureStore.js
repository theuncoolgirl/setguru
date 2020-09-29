//Refactored

import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth';
import setlists from './setlists';

const rootReducer = combineReducers({
    auth,
    setlists,
});

let storeEnhancer;

if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    storeEnhancer = composeEnhancers(applyMiddleware(thunk));
} else {
    storeEnhancer = applyMiddleware(thunk);
}

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        storeEnhancer
    )
}