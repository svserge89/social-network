export type FollowButtonProps = {
  followed: boolean
  following?: boolean
  follow: () => void
  unfollow: () => void
}
