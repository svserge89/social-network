export type Contacts = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null
}

export type Photos = {
  small: string | null
  large: string | null
}

export type Profile = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: Contacts
  photos: Photos
  aboutMe: string
}

export type User = {
  id: number
  name: string
  status: string | null
  photos: Photos
  followed: boolean
}

export type LoginData = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string | null
}