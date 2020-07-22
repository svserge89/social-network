import {ThunkDispatch} from 'redux-thunk';

import {RootState} from '../../../store/types';
import {UsersAction} from '../types';

export type DispatchExts = ThunkDispatch<RootState, undefined, UsersAction>
