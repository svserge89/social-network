import {InitAction, InitState, SET_INITIALIZED} from '../types';
import {RootState} from '../../../store/types';
import {TEST_INITIAL_STATE as TEST_AUTH_INITIAL_STATE} from '../../auth/__testing__/test-data';

export const TEST_INITIAL_STATE: InitState = {initialized: false};
export const TEST_ROOT_STATE: Partial<RootState> = {init: {...TEST_INITIAL_STATE}, auth: {...TEST_AUTH_INITIAL_STATE}};

export const TEST_SET_INITIALIZED_ACTION: InitAction = {type: SET_INITIALIZED, payload: {initialized: true}};
