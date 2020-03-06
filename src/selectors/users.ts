import {RootState} from '../store/types';
import {User} from '../models/types';

export const selectUsers = ({users}: RootState): User[] => users.users;

export const selectSize = ({users}: RootState): number => users.size;

export const selectTotal = ({users}: RootState): number => users.total;

export const selectPage = ({users}: RootState): number => users.page;

export const selectFetching = ({users}: RootState): boolean => users.fetching;

export const selectFollowing = ({users}: RootState): number[] => users.following;

export const selectAvailable = ({users}: RootState): string[] => (
  users.available.map(value => '' + value)
);