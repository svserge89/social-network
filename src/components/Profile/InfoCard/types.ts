import {Profile} from '../../../models/types';

export type InfoCardStateProps = {
  fullName: string
  status: string
  contacts: Map<string, string | null>
  lookingForAJob: boolean
  lookingForAJobDescription: string
  aboutMe: string
  contactLabels: Map<string, string>
  fetchingStatus: boolean
  updating: boolean
}

export type InfoCardDispatchProps = {
  updateStatus: (status: string) => void
  updateProfile: (profile: Profile) => void
}

export type InfoCardOwnProps = {
  editable?: boolean
}

export type InfoCardProps = InfoCardStateProps & InfoCardDispatchProps & InfoCardOwnProps;