import {
  SET_FETCHING,
  SET_FETCHING_PHOTO,
  SET_FETCHING_STATUS,
  SET_FOLLOWED,
  SET_FOLLOWING,
  SET_PHOTO,
  SET_PROFILE,
  SET_STATUS,
  SET_UPDATING,
  SetFetchingAction,
  SetFetchingPhotoAction,
  SetFetchingStatusAction,
  SetFollowedAction,
  SetFollowingAction,
  SetPhotoAction,
  SetProfileAction,
  SetStatusAction,
  SetUpdatingAction
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

it('should create an action to set profile', () => {
  const profile = {...TEST_PROFILE};
  const expected: SetProfileAction = {type: SET_PROFILE, payload: {profile}};

  expect(setProfile(profile)).toEqual(expected);
});

it('should create an action to set status', () => {
  const expected: SetStatusAction = {type: SET_STATUS, payload: {status: 'test status'}};

  expect(setStatus('test status')).toEqual(expected);
});

it('should create an action to set photo', () => {
  const photos = {...TEST_PHOTOS};
  const expected: SetPhotoAction = {type: SET_PHOTO, payload: {photos}};

  expect(setPhoto(photos)).toEqual(expected);
});

it('should create an action to set fetching', () => {
  const expectedTrue: SetFetchingAction = {type: SET_FETCHING, payload: {fetching: true}};
  const expectedFalse: SetFetchingAction = {type: SET_FETCHING, payload: {fetching: false}};

  expect(setFetching(true)).toEqual(expectedTrue);
  expect(setFetching(false)).toEqual(expectedFalse);
});

it('should create an action to set fetching status', () => {
  const expectedTrue: SetFetchingStatusAction = {type: SET_FETCHING_STATUS, payload: {fetchingStatus: true}};
  const expectedFalse: SetFetchingStatusAction = {type: SET_FETCHING_STATUS, payload: {fetchingStatus: false}};

  expect(setFetchingStatus(true)).toEqual(expectedTrue);
  expect(setFetchingStatus(false)).toEqual(expectedFalse);
});

it('should create an action to set fetching photo', () => {
  const expectedTrue: SetFetchingPhotoAction = {type: SET_FETCHING_PHOTO, payload: {fetchingPhoto: true}};
  const expectedFalse: SetFetchingPhotoAction = {type: SET_FETCHING_PHOTO, payload: {fetchingPhoto: false}};

  expect(setFetchingPhoto(true)).toEqual(expectedTrue);
  expect(setFetchingPhoto(false)).toEqual(expectedFalse);
});

it('should create an action to set updating', () => {
  const expectedTrue: SetUpdatingAction = {type: SET_UPDATING, payload: {updating: true}};
  const expectedFalse: SetUpdatingAction = {type: SET_UPDATING, payload: {updating: false}};

  expect(setUpdating(true)).toEqual(expectedTrue);
  expect(setUpdating(false)).toEqual(expectedFalse);
});

it('should create an action to set followed', () => {
  const expectedTrue: SetFollowedAction = {type: SET_FOLLOWED, payload: {followed: true}};
  const expectedFalse: SetFollowedAction = {type: SET_FOLLOWED, payload: {followed: false}};

  expect(setFollowed(true)).toEqual(expectedTrue);
  expect(setFollowed(false)).toEqual(expectedFalse);
});

it('should create an action to set following', () => {
  const expectedTrue: SetFollowingAction = {type: SET_FOLLOWING, payload: {following: true}};
  const expectedFalse: SetFollowingAction = {type: SET_FOLLOWING, payload: {following: false}};

  expect(setFollowing(true)).toEqual(expectedTrue);
  expect(setFollowing(false)).toEqual(expectedFalse);
});
