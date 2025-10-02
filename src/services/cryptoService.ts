import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type Cryptocurrency = Database['public']['Tables']['cryptocurrencies']['Row'];

export const cryptoService = {
  async getCryptocurrencies() {
    const { data, error } = await supabase
      .from('cryptocurrencies')
      .select('*')
      .eq('status', '上架')
      .order('id', { ascending: true });

    if (error) throw error;
    return data as Cryptocurrency[];
  },

  async getCryptocurrencyById(id: number) {
    const { data, error } = await supabase
      .from('cryptocurrencies')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as Cryptocurrency | null;
  },

  async getTradableCryptocurrencies() {
    const { data, error } = await supabase
      .from('cryptocurrencies')
      .select('*')
      .eq('status', '上架')
      .eq('options_tradeable', true)
      .order('id', { ascending: true });

    if (error) throw error;
    return data as Cryptocurrency[];
  },
};
