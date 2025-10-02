import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type Miner = Database['public']['Tables']['miners']['Row'];

export const minerService = {
  async getMiners() {
    const { data, error } = await supabase
      .from('miners')
      .select(`
        *,
        cryptocurrency:cryptocurrencies(*)
      `)
      .eq('status', '上架')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getMinerById(id: number) {
    const { data, error } = await supabase
      .from('miners')
      .select(`
        *,
        cryptocurrency:cryptocurrencies(*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getMinersByCryptocurrency(cryptocurrencyId: number) {
    const { data, error } = await supabase
      .from('miners')
      .select('*')
      .eq('cryptocurrency_id', cryptocurrencyId)
      .eq('status', '上架')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as Miner[];
  },
};
