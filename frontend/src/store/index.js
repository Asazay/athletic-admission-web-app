// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import sessionReducer from './session';
import schoolsReducer from './schools';
import eventsReducer from './events';
import checkoutReducer from './checkout';

// frontend/src/store/index.js
// ...
const rootReducer = combineReducers({
    session: sessionReducer,
    schools: schoolsReducer,
    events: eventsReducer,
    checkout: checkoutReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;