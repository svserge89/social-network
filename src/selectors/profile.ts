import {createSelector, Selector} from 'reselect';

import {RootState} from '../store/types';
import {Profile} from '../models/types';

export const selectProfile = ({profile}: RootState): Profile => profile.profile;

export const selectStatus = ({profile}: RootState): string => profile.status || '';

export const selectContactLabels = ({profile}: RootState): Map<string, string> => profile.contactLabels;

export const selectFetching = ({profile}: RootState): boolean => profile.fetching;

export const selectFetchingStatus = ({profile}: RootState): boolean => profile.fetchingStatus;

export const selectFetchingPhoto = ({profile}: RootState): boolean => profile.fetchingPhoto;

export const selectUpdating = ({profile}: RootState): boolean => profile.updating;

export const selectFollowed = ({profile}: RootState): boolean | null => profile.followed;

export const selectFollowing = ({profile}: RootState): boolean => profile.following;

export const selectUserId: Selector<RootState, number> = createSelector(
  [selectProfile], ({userId}) => userId
);

export const selectFullName: Selector<RootState, string> = createSelector(
  [selectProfile], ({fullName}) => fullName
);

export const selectContacts: Selector<RootState, Map<string, string | null>> = createSelector(
  [selectProfile], ({contacts}) => new Map(Object.entries(contacts))
);

export const selectLookingForAJob: Selector<RootState, boolean> = createSelector(
  [selectProfile], ({lookingForAJob}) => lookingForAJob
);

export const selectLookingForAJobDescription: Selector<RootState, string> = createSelector(
  [selectProfile], ({lookingForAJobDescription}) => lookingForAJobDescription
);

export const selectAboutMe: Selector<RootState, string> = createSelector(
  [selectProfile], ({aboutMe}) => aboutMe
);

export const selectLargePhoto: Selector<RootState, string | null> = createSelector(
  [selectProfile], ({photos: {large}}) => large
);
