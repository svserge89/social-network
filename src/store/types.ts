import {AuthState} from '../reducers/auth/types';
import {InitState} from '../reducers/init/types';
import {ProfileState} from '../reducers/profile/types';
import {UsersState} from '../reducers/users/types';
import {ErrorState} from '../reducers/error/types';

export type RootState = {
  auth: AuthState
  init: InitState
  profile: ProfileState
  users: UsersState
  error: ErrorState
}
