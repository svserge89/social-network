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
  SET_UPDATING
} from './types';
import emptyProfile from './empty-profile';
import profileReducer from './reducer';
import {TEST_INITIAL_STATE, TEST_PHOTOS, TEST_PROFILE} from './__testing__/test-data';

describe('profile reducer', () => {
  let initialState: ProfileState;

  beforeEach(() => {
    initialState = {...TEST_INITIAL_STATE};
  });

  it('should return the initial state', () => {
    expect(profileReducer(undefined, {} as ProfileAction)).toEqual(initialState);
    expect(profileReducer(initialState, {} as ProfileAction)).toBe(initialState);
  });

  it('should handle SET_PROFILE', () => {
    const profile = {...TEST_PROFILE};

    testReducer({...initialState, profile}, {type: SET_PROFILE, payload: {profile}}, initialState);
    testReducer(
      {...initialState, profile: emptyProfile},
      {type: SET_PROFILE, payload: {profile: emptyProfile}},
      {...initialState, profile}
    );
  });

  it('should handle SET_STATUS', () => {
    testReducer(
      {...initialState, status: 'test status'},
      {type: SET_STATUS, payload: {status: 'test status'}},
      initialState
    );
  });

  it('should handle SET_FETCHING', () => {
    testReducer(
      {...initialState, fetching: true},
      {type: SET_FETCHING, payload: {fetching: true}},
      initialState
    );
    testReducer(
      {...initialState, fetching: false},
      {type: SET_FETCHING, payload: {fetching: false}},
      {...initialState, fetching: true}
    );
  });

  it('should handle SET_FETCHING_STATUS', () => {
    testReducer(
      {...initialState, fetchingStatus: true},
      {type: SET_FETCHING_STATUS, payload: {fetchingStatus: true}},
      initialState
    );
    testReducer(
      {...initialState, fetchingStatus: false},
      {type: SET_FETCHING_STATUS, payload: {fetchingStatus: false}},
      {...initialState, fetchingStatus: true}
    );
  });

  it('should handle SET_FETCHING_PHOTO', () => {
    testReducer(
      {...initialState, fetchingPhoto: true},
      {type: SET_FETCHING_PHOTO, payload: {fetchingPhoto: true}},
      initialState
    );
    testReducer(
      {...initialState, fetchingPhoto: false},
      {type: SET_FETCHING_PHOTO, payload: {fetchingPhoto: false}},
      {...initialState, fetchingPhoto: true}
    );
  });

  it('should handle SET_UPDATING', () => {
    testReducer(
      {...initialState, updating: true},
      {type: SET_UPDATING, payload: {updating: true}},
      initialState
    );
    testReducer(
      {...initialState, updating: false},
      {type: SET_UPDATING, payload: {updating: false}},
      {...initialState, updating: true}
    );
  });

  it('should handle SET_FOLLOWED', () => {
    testReducer(
      {...initialState, followed: true},
      {type: SET_FOLLOWED, payload: {followed: true}},
      initialState
    );
    testReducer(
      {...initialState, followed: false},
      {type: SET_FOLLOWED, payload: {followed: false}},
      {...initialState, followed: true}
    );
  });

  it('should handle SET_FOLLOWING', () => {
    testReducer(
      {...initialState, following: true},
      {type: SET_FOLLOWING, payload: {following: true}},
      initialState
    );
    testReducer(
      {...initialState, following: false},
      {type: SET_FOLLOWING, payload: {following: false}},
      {...initialState, following: true}
    );
  });

  it('should handle SET_PHOTO', () => {
    const photos = {...TEST_PHOTOS};

    testReducer(
      {...initialState, profile: {...initialState.profile, photos}},
      {type: SET_PHOTO, payload: {photos}},
      initialState
    );
  });
});

function testReducer(expected: ProfileState, action: ProfileAction, initialState: ProfileState): void {
  const result = profileReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
