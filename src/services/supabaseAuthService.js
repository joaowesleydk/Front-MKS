import { supabase } from '../lib/supabase'

export const authService = {
  // Login tradicional
  login: async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    })
    
    if (error) throw error
    return { user: data.user, token: data.session?.access_token }
  },
  
  // Registro
  register: async (userData) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name
        }
      }
    })
    
    if (error) throw error
    return { user: data.user, token: data.session?.access_token }
  },
  
  // Logout
  logout: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  },
  
  // Verificar usuário atual
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
}