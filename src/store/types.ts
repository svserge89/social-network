import {AuthState} from '../reducers/auth/types';
import {InitState} from '../reducers/init/types';
import {ProfileState} from '../reducers/profile/types';
import {UsersState} from '../reducers/users/types';
import {ErrorState} from '../reducers/error/types';
import {ChatState} from '../reducers/chat/types';

export type RootState = {
  auth: AuthState;
  init: InitState;
  profile: ProfileState;
  users: UsersState;
  chat: ChatState;
  error: ErrorState;
};
