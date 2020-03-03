import {createSelector, Selector} from 'reselect';

import {RootState} from '../store/types';

export const selectUserId = ({auth}: RootState): number | null => auth.userId;

export const selectLogin = ({auth}: RootState): string | null => auth.login;

export const selectFetching = ({auth}: RootState): boolean => auth.fetching;

export const selectUpdating = ({auth}: RootState): boolean => auth.updating;

export const selectCaptcha = ({auth}: RootState): string | null => auth.captcha;

export const selectLoading: Selector<RootState, boolean> = createSelector(
  [selectFetching, selectUpdating],
  (fetching, updating) => fetching || updating
);

export const selectAuthenticated: Selector<RootState, boolean> = createSelector(
  [selectUserId],
  (userId) => !!userId
);