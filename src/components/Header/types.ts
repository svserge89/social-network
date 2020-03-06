export type HeaderStateProps = {
  authenticated: boolean
  login: string
  loading: boolean
  isError: boolean
}

export type HeaderDispatchProps = {
  logout: () => void
}

export type HeaderOwnProps = {}

export type HeaderProps = HeaderStateProps & HeaderDispatchProps & HeaderOwnProps