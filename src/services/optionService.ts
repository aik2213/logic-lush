import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type OptionOrder = Database['public']['Tables']['option_orders']['Row'];
type OptionOrderInsert = Database['public']['Tables']['option_orders']['Insert'];

export const optionService = {
  async createOrder(order: OptionOrderInsert) {
    const { data, error } = await supabase
      .from('option_orders')
      .insert(order)
      .select()
      .single();

    if (error) throw error;
    return data as OptionOrder;
  },

  async getUserOrders(memberId: number) {
    const { data, error } = await supabase
      .from('option_orders')
      .select(`
        *,
        cryptocurrency:cryptocurrencies(*)
      `)
      .eq('member_id', memberId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPendingOrders(memberId: number) {
    const { data, error } = await supabase
      .from('option_orders')
      .select(`
        *,
        cryptocurrency:cryptocurrencies(*)
      `)
      .eq('member_id', memberId)
      .eq('result', 'pending')
      .order('started_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getOrderById(orderId: number) {
    const { data, error } = await supabase
      .from('option_orders')
      .select(`
        *,
        cryptocurrency:cryptocurrencies(*)
      `)
      .eq('id', orderId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateOrderResult(orderId: number, result: 'win' | 'lose', endPrice: number, profitLoss: number) {
    const { data, error } = await supabase
      .from('option_orders')
      .update({
        result,
        end_price: endPrice,
        profit_loss: profitLoss,
        completed_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data as OptionOrder;
  },
};
