import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import profileAPI from '../../../api/profile';
import followAPI from '../../../api/follow';
import {RootState} from '../../../store/types';
import {
  cleanProfile,
  follow,
  getFollowed,
  getProfile,
  getStatus,
  unfollow,
  updatePhoto,
  updateProfile,
  updateStatus,
} from '../thunks';
import {ErrorAction} from '../../error/types';
import {ProfileAction} from '../types';
import {DispatchExts} from '../__fixtures__/types';
import {
  ERROR_FOLLOW_RESPONSE,
  ERROR_UNFOLLOW_RESPONSE,
  ERROR_UPDATE_PHOTO_RESPONSE,
  ERROR_UPDATE_PROFILE_RESPONSE,
  ERROR_UPDATE_STATUS_RESPONSE,
  PHOTO,
  PROFILE,
  ROOT_STATE,
  ROOT_STATE_WITH_PROFILE,
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
  STATUS,
  SUCCESS_FOLLOW_RESPONSE,
  SUCCESS_UNFOLLOW_RESPONSE,
  SUCCESS_UPDATE_PHOTO_RESPONSE,
  SUCCESS_UPDATE_PROFILE_RESPONSE,
  SUCCESS_UPDATE_STATUS_RESPONSE,
  USER_ID,
} from '../__fixtures__/data';
import {
  ERROR_RESPONSE,
  FORM_ERROR_EXCEPTION,
  SET_ERROR_ACTION,
  SET_ERROR_STATUS_ACTION,
} from '../../error/__fixtures__/data';

const mockStore = configureMockStore<Partial<RootState>, DispatchExts>([thunk]);

describe('profile thunk actions', () => {
  const store = mockStore(ROOT_STATE);
  const storeWithProfile = mockStore(ROOT_STATE_WITH_PROFILE);

  afterEach(() => {
    store.clearActions();
    storeWithProfile.clearActions();
    jest.clearAllMocks();
  });

  describe('getProfile thunk', () => {
    const spyGet = jest.spyOn(profileAPI, 'get');

    it('should dispatch actions when success response', async () => {
      spyGet.mockResolvedValue(PROFILE);
      await testGetProfile(SET_PROFILE_ACTION);
    });

    it('should dispatch actions when error response', async () => {
      spyGet.mockRejectedValue(ERROR_RESPONSE);
      await testGetProfile(SET_ERROR_ACTION);
    });

    async function testGetProfile(
      expectedAction: ProfileAction | ErrorAction
    ): Promise<void> {
      await store.dispatch(getProfile(USER_ID));

      expect(spyGet).toBeCalledTimes(1);
      expect(spyGet).toBeCalledWith(USER_ID);
      expect(store.getActions()).toEqual<(ProfileAction | ErrorAction)[]>([
        SET_FETCHING_TRUE_ACTION,
        expectedAction,
        SET_FETCHING_FALSE_ACTION,
      ]);
    }
  });

  describe('updateProfile thunk', () => {
    const spyUpdate = jest.spyOn(profileAPI, 'update');

    it('should dispatch actions when success response', async () => {
      spyUpdate.mockResolvedValue(SUCCESS_UPDATE_PROFILE_RESPONSE);
      await testUpdateProfile([SET_PROFILE_ACTION]);
    });

    it('should dispatch actions and throw exception when error result code', async () => {
      spyUpdate.mockResolvedValue(ERROR_UPDATE_PROFILE_RESPONSE);
      await testUpdateProfile([], true);
    });

    it('should dispatch actions when error response', async () => {
      spyUpdate.mockRejectedValue(ERROR_RESPONSE);
      await testUpdateProfile([SET_ERROR_ACTION]);
    });

    async function testUpdateProfile(
      expectedActions: (ProfileAction | ErrorAction)[],
      expectError: boolean = false
    ): Promise<void> {
      let thrownError;

      try {
        await store.dispatch(updateProfile(PROFILE));
      } catch (error) {
        if (expectError) {
          thrownError = error;
        } else {
          throw error;
        }
      }

      expect(spyUpdate).toBeCalledTimes(1);
      expect(spyUpdate).toBeCalledWith(PROFILE);

      if (expectError) {
        expect(thrownError).toEqual(FORM_ERROR_EXCEPTION);
      }

      expect(store.getActions()).toEqual<(ProfileAction | ErrorAction)[]>([
        SET_UPDATING_TRUE_ACTION,
        ...expectedActions,
        SET_UPDATING_FALSE_ACTION,
      ]);
    }
  });

  describe('cleanProfile thunk', () => {
    it('should dispatch action', () => {
      store.dispatch(cleanProfile());

      expect(store.getActions()).toEqual<ProfileAction[]>([
        SET_PROFILE_EMPTY_ACTION,
      ]);
    });
  });

  describe('getStatus thunk', () => {
    const spyGetStatus = jest.spyOn(profileAPI, 'getStatus');

    it('should dispatch actions when success response', async () => {
      spyGetStatus.mockResolvedValue(STATUS);
      await testGetStatus(SET_STATUS_ACTION);
    });

    it('should dispatch actions when error response', async () => {
      spyGetStatus.mockRejectedValue(ERROR_RESPONSE);
      await testGetStatus(SET_ERROR_ACTION);
    });

    async function testGetStatus(
      expectedAction: ProfileAction | ErrorAction
    ): Promise<void> {
      await store.dispatch(getStatus(USER_ID));

      expect(spyGetStatus).toBeCalledTimes(1);
      expect(spyGetStatus).toBeCalledWith(USER_ID);
      expect(store.getActions()).toEqual<(ProfileAction | ErrorAction)[]>([
        SET_FETCHING_STATUS_TRUE_ACTION,
        expectedAction,
        SET_FETCHING_STATUS_FALSE_ACTION,
      ]);
    }
  });

  describe('updateStatus thunk', () => {
    const spyUpdateStatus = jest.spyOn(profileAPI, 'updateStatus');

    it('should dispatch actions when success response', async () => {
      spyUpdateStatus.mockResolvedValue(SUCCESS_UPDATE_STATUS_RESPONSE);
      await testUpdateStatus(SET_STATUS_ACTION);
    });

    it('should dispatch action when error status code', async () => {
      spyUpdateStatus.mockResolvedValue(ERROR_UPDATE_STATUS_RESPONSE);
      await testUpdateStatus(SET_ERROR_STATUS_ACTION);
    });

    it('should dispatch action when error response', async () => {
      spyUpdateStatus.mockRejectedValue(ERROR_RESPONSE);
      await testUpdateStatus(SET_ERROR_ACTION);
    });

    async function testUpdateStatus(
      expectedAction: ProfileAction | ErrorAction
    ): Promise<void> {
      await store.dispatch(updateStatus(STATUS));

      expect(spyUpdateStatus).toBeCalledTimes(1);
      expect(spyUpdateStatus).toBeCalledWith(STATUS);
      expect(store.getActions()).toEqual<(ProfileAction | ErrorAction)[]>([
        SET_FETCHING_STATUS_TRUE_ACTION,
        expectedAction,
        SET_FETCHING_STATUS_FALSE_ACTION,
      ]);
    }
  });

  describe('updatePhoto thunk', () => {
    const spyUpdatePhoto = jest.spyOn(profileAPI, 'updatePhoto');

    it('should dispatch actions when success response', async () => {
      spyUpdatePhoto.mockResolvedValue(SUCCESS_UPDATE_PHOTO_RESPONSE);
      await testUpdatePhoto(SET_PHOTO_ACTION);
    });

    it('should dispatch actions when error result code', async () => {
      spyUpdatePhoto.mockResolvedValue(ERROR_UPDATE_PHOTO_RESPONSE);
      await testUpdatePhoto(SET_ERROR_STATUS_ACTION);
    });

    it('should dispatch actions when error response', async () => {
      spyUpdatePhoto.mockRejectedValue(ERROR_RESPONSE);
      await testUpdatePhoto(SET_ERROR_ACTION);
    });

    async function testUpdatePhoto(
      expectedAction: ProfileAction | ErrorAction
    ): Promise<void> {
      await store.dispatch(updatePhoto(PHOTO));

      expect(spyUpdatePhoto).toBeCalledTimes(1);
      expect(spyUpdatePhoto).toBeCalledWith(PHOTO);
      expect(store.getActions()).toEqual<(ProfileAction | ErrorAction)[]>([
        SET_FETCHING_PHOTO_TRUE_ACTION,
        expectedAction,
        SET_FETCHING_PHOTO_FALSE_ACTION,
      ]);
    }
  });

  describe('getFollowed thunk', () => {
    const spyGet = jest.spyOn(followAPI, 'get');

    it('should dispatch actions when success response', async () => {
      spyGet.mockResolvedValue(true);
      await testGetFollowed(SET_FOLLOWED_TRUE_ACTION);
    });

    it('should dispatch actions when error response', async () => {
      spyGet.mockRejectedValue(ERROR_RESPONSE);
      await testGetFollowed(SET_ERROR_ACTION);
    });

    async function testGetFollowed(
      expectedAction: ProfileAction | ErrorAction
    ): Promise<void> {
      await storeWithProfile.dispatch(getFollowed());

      expect(spyGet).toBeCalledTimes(1);
      expect(spyGet).toBeCalledWith(USER_ID);
      expect(storeWithProfile.getActions()).toEqual<
        (ProfileAction | ErrorAction)[]
      >([
        SET_FOLLOWING_TRUE_ACTION,
        expectedAction,
        SET_FOLLOWING_FALSE_ACTION,
      ]);
    }
  });

  describe('follow thunk', () => {
    const spyFollow = jest.spyOn(followAPI, 'follow');

    it('should dispatch actions when success response', async () => {
      spyFollow.mockResolvedValue(SUCCESS_FOLLOW_RESPONSE);
      await testFollow(SET_FOLLOWED_TRUE_ACTION);
    });

    it('should dispatch actions when error result code', async () => {
      spyFollow.mockResolvedValue(ERROR_FOLLOW_RESPONSE);
      await testFollow(SET_ERROR_STATUS_ACTION);
    });

    it('should dispatch actions when error response', async () => {
      spyFollow.mockRejectedValue(ERROR_RESPONSE);
      await testFollow(SET_ERROR_ACTION);
    });

    async function testFollow(
      expectedAction: ProfileAction | ErrorAction
    ): Promise<void> {
      await storeWithProfile.dispatch(follow());

      expect(spyFollow).toBeCalledTimes(1);
      expect(spyFollow).toBeCalledWith(USER_ID);
      expect(storeWithProfile.getActions()).toEqual<
        (ProfileAction | ErrorAction)[]
      >([
        SET_FOLLOWING_TRUE_ACTION,
        expectedAction,
        SET_FOLLOWING_FALSE_ACTION,
      ]);
    }
  });

  describe('unfollow thunk', () => {
    const spyUnFollow = jest.spyOn(followAPI, 'unFollow');

    it('should dispatch actions when success response', async () => {
      spyUnFollow.mockResolvedValue(SUCCESS_UNFOLLOW_RESPONSE);
      await testUnfollow(SET_FOLLOWED_FALSE_ACTION);
    });

    it('should dispatch actions when error result code', async () => {
      spyUnFollow.mockResolvedValue(ERROR_UNFOLLOW_RESPONSE);
      await testUnfollow(SET_ERROR_STATUS_ACTION);
    });

    it('should dispatch actions when error response', async () => {
      spyUnFollow.mockRejectedValue(ERROR_RESPONSE);
      await testUnfollow(SET_ERROR_ACTION);
    });

    async function testUnfollow(
      expectedAction: ProfileAction | ErrorAction
    ): Promise<void> {
      await storeWithProfile.dispatch(unfollow());

      expect(spyUnFollow).toBeCalledTimes(1);
      expect(spyUnFollow).toBeCalledWith(USER_ID);
      expect(storeWithProfile.getActions()).toEqual<
        (ProfileAction | ErrorAction)[]
      >([
        SET_FOLLOWING_TRUE_ACTION,
        expectedAction,
        SET_FOLLOWING_FALSE_ACTION,
      ]);
    }
  });
});
