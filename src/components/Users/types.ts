import {User} from '../../models/types';

export type UsersStateProps = {
  currentUserId: number | null
  users: User[]
  size: number,
  total: number
  page: number
  fetching: boolean
  following: number[]
  available: string[]
}

export type UsersDispatchProps = {
  setPage: (page: number) => void
  setSize: (size: number) => void
  getUsers: (page: number, size: number) => void
  cleanUsers: () => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

export type UsersOwnProps = {}

export type UsersProps = UsersStateProps & UsersDispatchProps & UsersOwnProps;