import {InitAction, InitState, SET_INITIALIZED} from '../types';
import {RootState} from '../../../store/types';
import {INITIAL_STATE as AUTH_INITIAL_STATE} from '../../auth/__fixtures__/data';

export const INITIAL_STATE: InitState = {initialized: false};
export const ROOT_STATE: Partial<RootState> = {init: {...INITIAL_STATE}, auth: {...AUTH_INITIAL_STATE}};

export const SET_INITIALIZED_TRUE_ACTION: InitAction = {type: SET_INITIALIZED, payload: {initialized: true}};
export const SET_INITIALIZED_FALSE_ACTION: InitAction = {type: SET_INITIALIZED, payload: {initialized: false}};
