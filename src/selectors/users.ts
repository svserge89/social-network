import {RootState} from '../store/types';

export const selectUsers = ({users}: RootState) => users.users;

export const selectSize = ({users}: RootState) => users.size;

export const selectTotal = ({users}: RootState) => users.total;

export const selectPage = ({users}: RootState) => users.page;

export const selectFetching = ({users}: RootState) => users.fetching;

export const selectFollowing = ({users}: RootState) => users.following;

export const selectAvailable = ({users}: RootState) => users.available;