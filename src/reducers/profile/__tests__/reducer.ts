import {ProfileAction, ProfileState} from '../types';
import profileReducer from '../reducer';
import {
  EMPTY_ACTION,
  INITIAL_STATE,
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
  SET_PROFILE_EMPTY_ACTION,
  SET_STATUS_ACTION,
  SET_UPDATING_FALSE_ACTION,
  SET_UPDATING_TRUE_ACTION,
  STATE_WITH_EMPTY_PROFILE,
  STATE_WITH_FETCHING_PHOTO_TRUE,
  STATE_WITH_FETCHING_STATUS_TRUE,
  STATE_WITH_FETCHING_TRUE,
  STATE_WITH_FOLLOWED_TRUE,
  STATE_WITH_FOLLOWING_TRUE,
  STATE_WITH_PROFILE,
  STATE_WITH_PROFILE_PHOTOS,
  STATE_WITH_STATUS,
  STATE_WITH_UPDATING_TRUE
} from '../__fixtures__/data';

describe('profile reducer', () => {
  it('should return the initial state', () => {
    const initialState = {...INITIAL_STATE};
    
    expect(profileReducer(undefined, EMPTY_ACTION)).toEqual(INITIAL_STATE);
    expect(profileReducer(initialState, EMPTY_ACTION)).toBe(initialState);
  });

  it('should handle SET_PROFILE', () => {
    testReducer(STATE_WITH_PROFILE, SET_PROFILE_ACTION, {...INITIAL_STATE});
    testReducer(STATE_WITH_EMPTY_PROFILE, SET_PROFILE_EMPTY_ACTION, {...STATE_WITH_PROFILE});
  });

  it('should handle SET_STATUS', () => {
    testReducer(STATE_WITH_STATUS, SET_STATUS_ACTION, {...INITIAL_STATE});
  });

  it('should handle SET_FETCHING', () => {
    testReducer(STATE_WITH_FETCHING_TRUE, SET_FETCHING_TRUE_ACTION, {...INITIAL_STATE});
    testReducer(INITIAL_STATE, SET_FETCHING_FALSE_ACTION, {...STATE_WITH_FETCHING_TRUE});
  });

  it('should handle SET_FETCHING_STATUS', () => {
    testReducer(STATE_WITH_FETCHING_STATUS_TRUE, SET_FETCHING_STATUS_TRUE_ACTION, {...INITIAL_STATE});
    testReducer(INITIAL_STATE, SET_FETCHING_STATUS_FALSE_ACTION, {...STATE_WITH_FETCHING_STATUS_TRUE});
  });

  it('should handle SET_FETCHING_PHOTO', () => {
    testReducer(STATE_WITH_FETCHING_PHOTO_TRUE, SET_FETCHING_PHOTO_TRUE_ACTION, {...INITIAL_STATE});
    testReducer(INITIAL_STATE, SET_FETCHING_PHOTO_FALSE_ACTION, {...STATE_WITH_FETCHING_PHOTO_TRUE});
  });

  it('should handle SET_UPDATING', () => {
    testReducer(STATE_WITH_UPDATING_TRUE, SET_UPDATING_TRUE_ACTION, {...INITIAL_STATE});
    testReducer(INITIAL_STATE, SET_UPDATING_FALSE_ACTION, {...STATE_WITH_UPDATING_TRUE});
  });

  it('should handle SET_FOLLOWED', () => {
    testReducer(STATE_WITH_FOLLOWED_TRUE, SET_FOLLOWED_TRUE_ACTION, {...INITIAL_STATE});
    testReducer(INITIAL_STATE, SET_FOLLOWED_FALSE_ACTION, {...STATE_WITH_FOLLOWED_TRUE});
  });

  it('should handle SET_FOLLOWING', () => {
    testReducer(STATE_WITH_FOLLOWING_TRUE, SET_FOLLOWING_TRUE_ACTION, {...INITIAL_STATE});
    testReducer(INITIAL_STATE, SET_FOLLOWING_FALSE_ACTION, {...STATE_WITH_FOLLOWING_TRUE});
  });

  it('should handle SET_PHOTO', () => {
    testReducer(STATE_WITH_PROFILE_PHOTOS, SET_PHOTO_ACTION, {...INITIAL_STATE});
  });
});

function testReducer(expected: ProfileState, action: ProfileAction, initialState: ProfileState): void {
  const result = profileReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
