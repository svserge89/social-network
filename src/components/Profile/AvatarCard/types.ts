export type AvatarCardStateProps = {
  photo: string | null
  fetching: boolean
}

export type AvatarCardDispatchProps = {
  updatePhoto: (image: File) => void
}

export type AvatarCardOwnProps = {
  editable?: boolean
}

export type AvatarCardProps = AvatarCardStateProps & AvatarCardDispatchProps & AvatarCardOwnProps;