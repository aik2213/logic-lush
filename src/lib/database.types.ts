export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cryptocurrencies: {
        Row: {
          id: number
          title: string
          logo: string | null
          name: string
          code: string
          currency_type: string | null
          contract_address: string | null
          options_tradeable: boolean
          price_change: number
          amount: number
          user_withdrawal: boolean
          status: string
          current_price: number
          network: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          logo?: string | null
          name: string
          code: string
          currency_type?: string | null
          contract_address?: string | null
          options_tradeable?: boolean
          price_change?: number
          amount?: number
          user_withdrawal?: boolean
          status?: string
          current_price?: number
          network?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          logo?: string | null
          name?: string
          code?: string
          currency_type?: string | null
          contract_address?: string | null
          options_tradeable?: boolean
          price_change?: number
          amount?: number
          user_withdrawal?: boolean
          status?: string
          current_price?: number
          network?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      miners: {
        Row: {
          id: number
          cryptocurrency_id: number | null
          miner_name: string
          purchase_limit: number
          play_time: number
          minimum_rate: number
          maximum_rate: number
          buy_price: number
          sort_order: number
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          cryptocurrency_id?: number | null
          miner_name: string
          purchase_limit?: number
          play_time: number
          minimum_rate: number
          maximum_rate: number
          buy_price: number
          sort_order?: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          cryptocurrency_id?: number | null
          miner_name?: string
          purchase_limit?: number
          play_time?: number
          minimum_rate?: number
          maximum_rate?: number
          buy_price?: number
          sort_order?: number
          status?: string
          created_at?: string
        }
      }
      members: {
        Row: {
          id: number
          user_id: string | null
          avatar: string | null
          login_name: string
          email: string | null
          phone: string | null
          score: number
          invitation_code: string
          lose_all_amount: number
          lose_all_times: number
          win_all_amount: number
          win_all_times: number
          test_account: boolean
          superior_id: string | null
          shareholder_id: string | null
          login_at: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id?: string | null
          avatar?: string | null
          login_name: string
          email?: string | null
          phone?: string | null
          score?: number
          invitation_code: string
          lose_all_amount?: number
          lose_all_times?: number
          win_all_amount?: number
          win_all_times?: number
          test_account?: boolean
          superior_id?: string | null
          shareholder_id?: string | null
          login_at?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string | null
          avatar?: string | null
          login_name?: string
          email?: string | null
          phone?: string | null
          score?: number
          invitation_code?: string
          lose_all_amount?: number
          lose_all_times?: number
          win_all_amount?: number
          win_all_times?: number
          test_account?: boolean
          superior_id?: string | null
          shareholder_id?: string | null
          login_at?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      option_orders: {
        Row: {
          id: number
          member_id: number | null
          cryptocurrency_id: number | null
          order_type: string
          amount: number
          duration: number
          profit_rate: number
          start_price: number
          end_price: number | null
          result: string
          profit_loss: number
          started_at: string
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: number
          member_id?: number | null
          cryptocurrency_id?: number | null
          order_type: string
          amount: number
          duration: number
          profit_rate: number
          start_price: number
          end_price?: number | null
          result?: string
          profit_loss?: number
          started_at?: string
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          member_id?: number | null
          cryptocurrency_id?: number | null
          order_type?: string
          amount?: number
          duration?: number
          profit_rate?: number
          start_price?: number
          end_price?: number | null
          result?: string
          profit_loss?: number
          started_at?: string
          completed_at?: string | null
          created_at?: string
        }
      }
      admin_users: {
        Row: {
          id: number
          user_id: string | null
          login_account: string
          avatar: string | null
          role: string
          user_group: string
          superior_id: string | null
          shareholder_id: string | null
          phone: string | null
          email: string | null
          login_times: number
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id?: string | null
          login_account: string
          avatar?: string | null
          role: string
          user_group: string
          superior_id?: string | null
          shareholder_id?: string | null
          phone?: string | null
          email?: string | null
          login_times?: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string | null
          login_account?: string
          avatar?: string | null
          role?: string
          user_group?: string
          superior_id?: string | null
          shareholder_id?: string | null
          phone?: string | null
          email?: string | null
          login_times?: number
          status?: string
          created_at?: string
        }
      }
    }
  }
}
