import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type Member = Database['public']['Tables']['members']['Row'];
type MemberInsert = Database['public']['Tables']['members']['Insert'];

export const memberService = {
  async getCurrentMember() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;
    return data as Member | null;
  },

  async createMember(member: MemberInsert) {
    const { data, error } = await supabase
      .from('members')
      .insert(member)
      .select()
      .single();

    if (error) throw error;
    return data as Member;
  },

  async updateMember(memberId: number, updates: Partial<Member>) {
    const { data, error } = await supabase
      .from('members')
      .update(updates)
      .eq('id', memberId)
      .select()
      .single();

    if (error) throw error;
    return data as Member;
  },

  async updateLoginTime(memberId: number) {
    const { data, error } = await supabase
      .from('members')
      .update({ login_at: new Date().toISOString() })
      .eq('id', memberId)
      .select()
      .single();

    if (error) throw error;
    return data as Member;
  },
};
