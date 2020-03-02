import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth/reducer';
import initReducer from '../reducers/init/reducer';
import profileReducer from '../reducers/profile/reducer';
import usersReducer from '../reducers/users/users';
import errorReducer from '../reducers/error/reducer';

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