import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../../../store/types';
import {InitAction} from '../types';

export type DispatchExts = ThunkDispatch<RootState, undefined, InitAction>
