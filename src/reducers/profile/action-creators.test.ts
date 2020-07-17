import {
  ProfileAction,
  SET_FETCHING,
  SET_FETCHING_PHOTO,
  SET_FETCHING_STATUS,
  SET_FOLLOWED,
  SET_FOLLOWING,
  SET_PHOTO,
  SET_PROFILE,
  SET_STATUS,
  SET_UPDATING,
} from './types';
import {
  setFetching,
  setFetchingPhoto,
  setFetchingStatus,
  setFollowed,
  setFollowing,
  setPhoto,
  setProfile,
  setStatus,
  setUpdating
} from './action-creators';
import {TEST_PHOTOS, TEST_PROFILE} from './__testing__/test-data';

describe('profile action creators', () => {
  it('should create an action to set profile', () => {
    const profile = {...TEST_PROFILE};

    expect(setProfile(profile)).toEqual<ProfileAction>({type: SET_PROFILE, payload: {profile}});
  });

  it('should create an action to set status', () => {
    expect(setStatus('test status'))
      .toEqual<ProfileAction>({type: SET_STATUS, payload: {status: 'test status'}});
  });

  it('should create an action to set photo', () => {
    const photos = {...TEST_PHOTOS};

    expect(setPhoto(photos)).toEqual<ProfileAction>({type: SET_PHOTO, payload: {photos}});
  });

  it('should create an action to set fetching', () => {
    expect(setFetching(true)).toEqual<ProfileAction>({type: SET_FETCHING, payload: {fetching: true}});
    expect(setFetching(false))
      .toEqual<ProfileAction>({type: SET_FETCHING, payload: {fetching: false}});
  });

  it('should create an action to set fetching status', () => {
    expect(setFetchingStatus(true))
      .toEqual<ProfileAction>({type: SET_FETCHING_STATUS, payload: {fetchingStatus: true}});
    expect(setFetchingStatus(false))
      .toEqual<ProfileAction>({type: SET_FETCHING_STATUS, payload: {fetchingStatus: false}});
  });

  it('should create an action to set fetching photo', () => {
    expect(setFetchingPhoto(true))
      .toEqual<ProfileAction>({type: SET_FETCHING_PHOTO, payload: {fetchingPhoto: true}});
    expect(setFetchingPhoto(false))
      .toEqual<ProfileAction>({type: SET_FETCHING_PHOTO, payload: {fetchingPhoto: false}});
  });

  it('should create an action to set updating', () => {
    expect(setUpdating(true)).toEqual<ProfileAction>({type: SET_UPDATING, payload: {updating: true}});
    expect(setUpdating(false)).toEqual<ProfileAction>({type: SET_UPDATING, payload: {updating: false}});
  });

  it('should create an action to set followed', () => {
    expect(setFollowed(true)).toEqual<ProfileAction>({type: SET_FOLLOWED, payload: {followed: true}});
    expect(setFollowed(false))
      .toEqual<ProfileAction>({type: SET_FOLLOWED, payload: {followed: false}});
  });

  it('should create an action to set following', () => {
    expect(setFollowing(true))
      .toEqual<ProfileAction>({type: SET_FOLLOWING, payload: {following: true}});
    expect(setFollowing(false))
      .toEqual<ProfileAction>({type: SET_FOLLOWING, payload: {following: false}});
  });
});
