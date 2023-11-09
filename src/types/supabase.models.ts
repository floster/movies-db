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

export interface IRawSupabaseProfile {
  id: string
  updated_at: Date
  username: string
  full_name: string
  avatar_url: string
  favorites: string
  locale: string
  god_mode: boolean
}

export interface ISupabaseAccountMeta {
  id: string
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
