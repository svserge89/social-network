import {FormProps} from 'react-final-form';

import {LoginData} from '../../../models/types';

export type LoginFormProps = {
  onSubmit: FormProps<LoginData>['onSubmit']
  captcha?: string | null
}
