export type UserCardProps = {
  image: string | null;
  name: string;
  status: string;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  followed: boolean;
  currentUserId: number | null;
  following: boolean;
  userId: number;
};
