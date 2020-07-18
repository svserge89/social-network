import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../../../store/types';
import {AuthAction} from '../types';

export type DispatchExts = ThunkDispatch<RootState, undefined, AuthAction>
