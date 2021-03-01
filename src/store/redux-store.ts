import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import auth from '../reducers/auth/reducer';
import init from '../reducers/init/reducer';
import profile from '../reducers/profile/reducer';
import users from '../reducers/users/reducer';
import chat from '../reducers/chat/reducer';
import error from '../reducers/error/reducer';

const reducers = combineReducers({
  auth,
  init,
  profile,
  users,
  chat,
  error,
});

const composeEnhancers =
  (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
