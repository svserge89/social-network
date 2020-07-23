import {ProfileAction} from '../types';
import {
  setFetching,
  setFetchingPhoto,
  setFetchingStatus,
  setFollowed,
  setFollowing,
  setPhoto,
  setProfile,
  setStatus,
  setUpdating,
} from '../action-creators';
import {
  PHOTOS,
  PROFILE,
  SET_FETCHING_FALSE_ACTION,
  SET_FETCHING_PHOTO_FALSE_ACTION,
  SET_FETCHING_PHOTO_TRUE_ACTION,
  SET_FETCHING_STATUS_FALSE_ACTION,
  SET_FETCHING_STATUS_TRUE_ACTION,
  SET_FETCHING_TRUE_ACTION,
  SET_FOLLOWED_FALSE_ACTION,
  SET_FOLLOWED_TRUE_ACTION,
  SET_FOLLOWING_FALSE_ACTION,
  SET_FOLLOWING_TRUE_ACTION,
  SET_PHOTO_ACTION,
  SET_PROFILE_ACTION,
  SET_STATUS_ACTION,
  SET_UPDATING_FALSE_ACTION,
  SET_UPDATING_TRUE_ACTION,
  STATUS,
} from '../__fixtures__/data';

describe('profile action creators', () => {
  it('should create an action to set profile', () => {
    const profile = {...PROFILE};

    expect(setProfile(profile)).toEqual<ProfileAction>(SET_PROFILE_ACTION);
  });

  it('should create an action to set status', () => {
    expect(setStatus(STATUS)).toEqual<ProfileAction>(SET_STATUS_ACTION);
  });

  it('should create an action to set photo', () => {
    const photos = {...PHOTOS};

    expect(setPhoto(photos)).toEqual<ProfileAction>(SET_PHOTO_ACTION);
  });

  it('should create an action to set fetching', () => {
    expect(setFetching(true)).toEqual<ProfileAction>(SET_FETCHING_TRUE_ACTION);
    expect(setFetching(false)).toEqual<ProfileAction>(
      SET_FETCHING_FALSE_ACTION
    );
  });

  it('should create an action to set fetching status', () => {
    expect(setFetchingStatus(true)).toEqual<ProfileAction>(
      SET_FETCHING_STATUS_TRUE_ACTION
    );
    expect(setFetchingStatus(false)).toEqual<ProfileAction>(
      SET_FETCHING_STATUS_FALSE_ACTION
    );
  });

  it('should create an action to set fetching photo', () => {
    expect(setFetchingPhoto(true)).toEqual<ProfileAction>(
      SET_FETCHING_PHOTO_TRUE_ACTION
    );
    expect(setFetchingPhoto(false)).toEqual<ProfileAction>(
      SET_FETCHING_PHOTO_FALSE_ACTION
    );
  });

  it('should create an action to set updating', () => {
    expect(setUpdating(true)).toEqual<ProfileAction>(SET_UPDATING_TRUE_ACTION);
    expect(setUpdating(false)).toEqual<ProfileAction>(
      SET_UPDATING_FALSE_ACTION
    );
  });

  it('should create an action to set followed', () => {
    expect(setFollowed(true)).toEqual<ProfileAction>(SET_FOLLOWED_TRUE_ACTION);
    expect(setFollowed(false)).toEqual<ProfileAction>(
      SET_FOLLOWED_FALSE_ACTION
    );
  });

  it('should create an action to set following', () => {
    expect(setFollowing(true)).toEqual<ProfileAction>(
      SET_FOLLOWING_TRUE_ACTION
    );
    expect(setFollowing(false)).toEqual<ProfileAction>(
      SET_FOLLOWING_FALSE_ACTION
    );
  });
});
