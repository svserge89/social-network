export type AppStateProps = {
  initialized: boolean
  isError: boolean
  errorCode: number
  errorDescription: string | null
}

export type AppDispatchProps = {
  initialization: () => void
}

export type AppOwnProps = {}

export type AppProps = AppStateProps & AppDispatchProps & AppOwnProps;