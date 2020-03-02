import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {reducer as form} from 'redux-form';
import thunk from 'redux-thunk';

import auth from '../reducers/auth/reducer';
import init from '../reducers/init/reducer';
import profile from '../reducers/profile/reducer';
import users from '../reducers/users/users';
import error from '../reducers/error/reducer';

const reducers = combineReducers({auth, init, profile, users, error, form});

// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose
  || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;