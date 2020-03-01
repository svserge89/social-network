import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import initReducer from '../reducers/init';
import profileReducer from '../reducers/profile';
import usersReducer from '../reducers/users';
import errorReducer from '../reducers/error';

const reducers = combineReducers({
  auth: authReducer,
  init: initReducer,
  profile: profileReducer,
  users: usersReducer,
  error: errorReducer,
  form: formReducer
});

const composeEnhancers = (
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;