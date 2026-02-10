import { supabase } from '../lib/supabase'

export const supabaseProductService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { data }
  },

  getByCategory: async (categoria) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', categoria)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { data }
  },

  search: async (query) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    
    if (error) throw error
    return { data }
  },

  create: async (produto) => {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: produto.nome,
        price: parseFloat(produto.preco),
        category: produto.categoria,
        image: produto.imagem,
        description: produto.descricao,
        promocao: produto.promocao || false
      }])
      .select()
    
    if (error) throw error
    return data[0]
  }
}