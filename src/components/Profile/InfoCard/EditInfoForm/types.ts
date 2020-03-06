import {InjectedFormProps} from 'redux-form';

import {Profile} from '../../../../models/types';

export type EditInfoFormStateProps = {
  lookingForAJobValue: boolean
  initialValues: Profile
}

export type EditInfoFormDispatchProps = {}

export type EditInfoFormOwnProps = {
  setEditMode: (value: boolean) => void
  contactLabels: Map<string, string>
  updating: boolean
}

export type EditInfoFormNonInjectedProps = EditInfoFormStateProps
  & EditInfoFormDispatchProps
  & EditInfoFormOwnProps

export type EditInfoFormProps = InjectedFormProps<Profile, EditInfoFormNonInjectedProps>
  & EditInfoFormNonInjectedProps