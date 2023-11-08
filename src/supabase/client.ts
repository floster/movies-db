const PROFILES_TABLE = import.meta.env.VITE_SB_PROFILES_TABLE

import { createClient } from '@supabase/supabase-js'
import { IFavoritesState } from '../types/tmdb.models'

const clientURL = import.meta.env.VITE_SUPABASE_URL!
const clientKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(clientURL, clientKey)

export const updateFavorites = async (
  favorites: IFavoritesState,
  userId: string
) => {
  const { error } = await supabase
    .from(PROFILES_TABLE as string)
    .update({ favorites: JSON.stringify(favorites) })
    .match({ id: userId })

  if (error) {
    console.error('Error updating favorites:', error)
  }
}
