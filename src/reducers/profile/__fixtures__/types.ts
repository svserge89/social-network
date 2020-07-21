import {ThunkDispatch} from 'redux-thunk';

import {RootState} from '../../../store/types';
import {ProfileAction} from '../types';

export type DispatchExts = ThunkDispatch<RootState, undefined, ProfileAction>
