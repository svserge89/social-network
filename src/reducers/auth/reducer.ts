import {AuthState, SET_CAPTCHA, SET_CURRENT_USER, SET_FETCHING, SET_UPDATING} from './types';

const changeData = (state: AuthState, data: any): AuthState => ({...state, ...data});

const initialState: AuthState = {
  userId: null,
  email: null,
  login: null,
  fetching: false,
  updating: false,
  captcha: null
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case SET_FETCHING:
    case SET_CURRENT_USER:
    case SET_CAPTCHA:
    case SET_UPDATING:
      return changeData(state, action.data);
    default:
      return state;
  }
};

export default authReducer;