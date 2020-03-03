import {
  ProfileAction,
  ProfileState,
  SET_FETCHING,
  SET_FETCHING_PHOTO,
  SET_FETCHING_STATUS,
  SET_PHOTO,
  SET_PROFILE,
  SET_STATUS,
  SET_UPDATING,
  SetPhotoAction
} from './types';
import emptyProfile from './emptyProfile';

const changeData = (state: ProfileState, {data}: ProfileAction): ProfileState => ({
  ...state,
  ...data
});

const changePhoto = (state: ProfileState, {data: {photos}}: SetPhotoAction): ProfileState => ({
  ...state,
  profile: {...state.profile, photos}
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
    ['website', 'Web Site'],
    ['mainLink', 'Main Link']
  ]),
  fetching: false,
  fetchingStatus: false,
  fetchingPhoto: false,
  updating: false,
  status: null
};

const profileReducer = (state = initialState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case SET_PROFILE:
    case SET_STATUS:
    case SET_FETCHING:
    case SET_FETCHING_STATUS:
    case SET_FETCHING_PHOTO:
    case SET_UPDATING:
      return changeData(state, action);
    case SET_PHOTO:
      return changePhoto(state, action as SetPhotoAction);
    default:
      return state;
  }
};

export default profileReducer;