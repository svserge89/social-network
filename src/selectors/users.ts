import {RootState} from '../store/types';
import {User} from '../models/types';

export const selectUsers = ({users}: RootState): User[] => users.users;

export const selectTotal = ({users}: RootState): number => users.total;

export const selectFetching = ({users}: RootState): boolean => users.fetching;

export const selectFollowing = ({users}: RootState): number[] =>
  users.following;

export const selectAvailable = ({users}: RootState): number[] =>
  users.available;
