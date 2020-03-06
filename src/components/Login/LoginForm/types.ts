import {InjectedFormProps} from 'redux-form';

import {LoginData} from '../../../models/types';

export type LoginFormOwnProps = {
  updating: boolean
  captcha?: string | null
}

export type LoginFormProps = InjectedFormProps<LoginData, LoginFormOwnProps> & LoginFormOwnProps