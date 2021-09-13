import {
  ProfileAction,
  ProfileState,
  SET_FETCHING,
  SET_FETCHING_PHOTO,
  SET_FETCHING_STATUS,
  SET_FOLLOWED,
  SET_FOLLOWING,
  SET_PHOTO,
  SET_PROFILE,
  SET_STATUS,
  SET_UPDATING,
  SetPhotoAction,
} from './types';
import emptyProfile from './empty-profile';

const changeData = (
  state: ProfileState,
  {payload}: ProfileAction
): ProfileState => ({...state, ...payload});

const changePhoto = (
  state: ProfileState,
  {payload: {photos}}: SetPhotoAction
): ProfileState => ({
  ...state,
  profile: {...state.profile, photos},
});

const initialState: ProfileState = {
  profile: {...emptyProfile},
  contactLabels: new Map([
    ['github', 'GitHub'],
    ['facebook', 'Facebook'],
    ['vk', 'VK'],
    ['twitter', 'Twitter'],
    ['instagram', 'Instagram'],
    ['youtube', 'Youtube'],
    ['website', 'Website'],
    ['mainLink', 'Main link'],
  ]),
  fetching: false,
  fetchingStatus: false,
  fetchingPhoto: false,
  updating: false,
  status: null,
  followed: false,
  following: false,
};

const profileReducer = (
  state = initialState,
  action: ProfileAction
): ProfileState => {
  switch (action.type) {
    case SET_PROFILE:
    case SET_STATUS:
    case SET_FETCHING:
    case SET_FETCHING_STATUS:
    case SET_FETCHING_PHOTO:
    case SET_UPDATING:
    case SET_FOLLOWED:
    case SET_FOLLOWING:
      return changeData(state, action);
    case SET_PHOTO:
      return changePhoto(state, action);
    default:
      return state;
  }
};

export default profileReducer;
