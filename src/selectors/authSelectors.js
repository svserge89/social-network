import {createSelector} from 'reselect';

export const userIdSelector = ({auth}) => auth.userId;

export const loginSelector = ({auth}) => auth.login;

export const fetchingSelector = ({auth}) => auth.fetching;

export const updatingSelector = ({auth}) => auth.updating;

export const captchaSelector = ({auth}) => auth.captcha;

export const loadingSelector = createSelector(
  [fetchingSelector, updatingSelector],
  (fetching, updating) => fetching || updating
);

export const authenticatedSelector = createSelector(
  [userIdSelector],
  (userId) => !!userId
);