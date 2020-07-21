import {
  ProfileAction,
  ProfileState
} from '../types';
import emptyProfile from '../empty-profile';
import profileReducer from '../reducer';
import {
  INITIAL_STATE,
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
  SET_PROFILE_EMPTY_ACTION,
  SET_STATUS_ACTION,
  SET_UPDATING_FALSE_ACTION,
  SET_UPDATING_TRUE_ACTION,
  STATUS
} from '../__fixtures__/data';

describe('profile reducer', () => {
  let initialState: ProfileState;

  beforeEach(() => {
    initialState = {...INITIAL_STATE};
  });

  it('should return the initial state', () => {
    expect(profileReducer(undefined, {} as ProfileAction)).toEqual(initialState);
    expect(profileReducer(initialState, {} as ProfileAction)).toBe(initialState);
  });

  it('should handle SET_PROFILE', () => {
    const profile = {...PROFILE};

    testReducer({...initialState, profile}, SET_PROFILE_ACTION, initialState);
    testReducer(
      {...initialState, profile: emptyProfile},
      SET_PROFILE_EMPTY_ACTION,
      {...initialState, profile}
    );
  });

  it('should handle SET_STATUS', () => {
    testReducer({...initialState, status: STATUS}, SET_STATUS_ACTION, initialState);
  });

  it('should handle SET_FETCHING', () => {
    testReducer({...initialState, fetching: true}, SET_FETCHING_TRUE_ACTION, initialState);
    testReducer(
      {...initialState, fetching: false},
      SET_FETCHING_FALSE_ACTION,
      {...initialState, fetching: true}
    );
  });

  it('should handle SET_FETCHING_STATUS', () => {
    testReducer({...initialState, fetchingStatus: true}, SET_FETCHING_STATUS_TRUE_ACTION, initialState);
    testReducer(
      {...initialState, fetchingStatus: false},
      SET_FETCHING_STATUS_FALSE_ACTION,
      {...initialState, fetchingStatus: true}
    );
  });

  it('should handle SET_FETCHING_PHOTO', () => {
    testReducer({...initialState, fetchingPhoto: true}, SET_FETCHING_PHOTO_TRUE_ACTION, initialState);
    testReducer(
      {...initialState, fetchingPhoto: false},
      SET_FETCHING_PHOTO_FALSE_ACTION,
      {...initialState, fetchingPhoto: true}
    );
  });

  it('should handle SET_UPDATING', () => {
    testReducer({...initialState, updating: true}, SET_UPDATING_TRUE_ACTION, initialState);
    testReducer(
      {...initialState, updating: false},
      SET_UPDATING_FALSE_ACTION,
      {...initialState, updating: true}
    );
  });

  it('should handle SET_FOLLOWED', () => {
    testReducer({...initialState, followed: true}, SET_FOLLOWED_TRUE_ACTION, initialState);
    testReducer(
      {...initialState, followed: false},
      SET_FOLLOWED_FALSE_ACTION,
      {...initialState, followed: true}
    );
  });

  it('should handle SET_FOLLOWING', () => {
    testReducer({...initialState, following: true}, SET_FOLLOWING_TRUE_ACTION, initialState);
    testReducer(
      {...initialState, following: false},
      SET_FOLLOWING_FALSE_ACTION,
      {...initialState, following: true}
    );
  });

  it('should handle SET_PHOTO', () => {
    const photos = {...PHOTOS};

    testReducer({...initialState, profile: {...initialState.profile, photos}}, SET_PHOTO_ACTION, initialState);
  });
});

function testReducer(expected: ProfileState, action: ProfileAction, initialState: ProfileState): void {
  const result = profileReducer(initialState, action);

  expect(result).toEqual(expected);
  expect(result).not.toBe(initialState);
}
