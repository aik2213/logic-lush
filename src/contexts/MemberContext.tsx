import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { memberService } from '@/services/memberService';
import { Database } from '@/lib/database.types';

type Member = Database['public']['Tables']['members']['Row'];

interface MemberContextType {
  member: Member | null;
  loading: boolean;
  updateBalance: (amount: number) => Promise<void>;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export function MemberProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMember();
  }, []);

  const loadMember = async () => {
    try {
      const currentMember = await memberService.getCurrentMember();
      setMember(currentMember);
    } catch (error) {
      console.error('Error loading member:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBalance = async (amount: number) => {
    if (!member) return;

    try {
      const updatedMember = await memberService.updateMember(member.id, {
        score: member.score + amount,
      });
      setMember(updatedMember);
    } catch (error) {
      console.error('Error updating balance:', error);
      throw error;
    }
  };

  return (
    <MemberContext.Provider value={{ member, loading, updateBalance }}>
      {children}
    </MemberContext.Provider>
  );
}

export function useMember() {
  const context = useContext(MemberContext);
  if (context === undefined) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
}
