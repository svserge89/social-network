import {FormProps} from 'react-final-form';

import {Profile} from '../../../../models/types';

export type EditInfoFormProps = {
  onSubmit: FormProps<Profile>['onSubmit']
  setEditMode: (value: boolean) => void
  contactLabels: Map<string, string>
  updating: boolean
}
