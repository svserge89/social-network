import {Profile} from '../../models/types';

const emptyProfile: Profile = {
  userId: 0,
  lookingForAJob: false,
  lookingForAJobDescription: '',
  fullName: '',
  contacts: {
    github: null,
    vk: null,
    facebook: null,
    instagram: null,
    twitter: null,
    website: null,
    youtube: null,
    mainLink: null
  },
  photos: {small: null, large: null},
  aboutMe: ''
};

export default emptyProfile;