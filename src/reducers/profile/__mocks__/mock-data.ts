import {Photos, Profile} from '../../../models/types';
import {ProfileState} from '../types';
import emptyProfile from '../emptyProfile';

export const MOCK_PHOTOS: Photos = {small: 'small/photo/url', large: 'large/photo/url'};

export const MOCK_PROFILE: Profile = {
  userId: 42,
  fullName: 'test user',
  aboutMe: 'some info about test user',
  lookingForAJob: true,
  lookingForAJobDescription: 'some looking for a job description',
  contacts: {
    facebook: 'facebook.com',
    github: 'github.com',
    instagram: 'instagram.com',
    twitter: 'twitter.com',
    mainLink: 'main.link.com',
    vk: 'vk.com',
    youtube: 'youtube.com',
    website: 'website.com'
  },
  photos: MOCK_PHOTOS
};

export const MOCK_INITIAL_STATE: ProfileState = {
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
  status: null,
  followed: null,
  following: false
};
