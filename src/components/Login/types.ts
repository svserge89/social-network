import {LoginData} from '../../models/types';

export type LoginStateProps = {
  authenticated: boolean
  updating: boolean
  captcha?: string | null
}

export type LoginDispatchProps = {
  login: (data: LoginData) => void
}

export type LoginOwnProps = {}

export type LoginProps = LoginStateProps & LoginDispatchProps & LoginOwnProps;