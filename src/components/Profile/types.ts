import {RouteComponentProps} from "react-router-dom";

export type ProfileStateProps = {
  currentUserId: number | null
  userId: number
  fetching: boolean
}

export type ProfileDispatchProps = {
  getProfile: (userId: number) => void
  getStatus: (userId: number) => void
  cleanProfile: () => void
}

export type ProfileOwnProps = {}

export type ProfileNonInjectedProps = ProfileStateProps & ProfileDispatchProps & ProfileOwnProps;

export type ProfileProps = RouteComponentProps<{ userId?: string }> & ProfileNonInjectedProps;