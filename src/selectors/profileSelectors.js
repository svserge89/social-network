import {createSelector} from 'reselect';

export const profileSelector = ({profile}) => profile.profile;

export const statusSelector = ({profile}) => profile.status;

export const contactLabelsSelector = ({profile}) => profile.contactLabels;

export const fetchingSelector = ({profile}) => profile.fetching;

export const fetchingStatusSelector = ({profile}) => profile.fetchingStatus;

export const fetchingPhotoSelector = ({profile}) => profile.fetchingPhoto;

export const updatingSelector = ({profile}) => profile.updating;

export const userIdSelector = createSelector(
  [profileSelector], ({userId}) => userId
);

export const fullNameSelector = createSelector(
  [profileSelector], ({fullName}) => fullName
);

export const contactsSelector = createSelector(
  [profileSelector], ({contacts}) => contacts
);

export const lookingForAJobSelector = createSelector(
  [profileSelector], ({lookingForAJob}) => lookingForAJob
);

export const lookingForAJobDescriptionSelector = createSelector(
  [profileSelector], ({lookingForAJobDescription}) => lookingForAJobDescription
);

export const aboutMeSelector = createSelector(
  [profileSelector], ({aboutMe}) => aboutMe
);

export const largePhotoSelector = createSelector(
  [profileSelector], ({photos: {large}}) => large
);