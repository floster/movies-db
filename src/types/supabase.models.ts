export interface IRawSupabaseUserMeta {
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  picture: string
  preferred_username?: string
  provider_id: string
  sub: string
  user_name?: string
}

export interface ISupabaseUserMeta {
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  picture: string
  preferred_username?: string
  provider_id: string
  sub: string
  user_name?: string
  username: string
}
