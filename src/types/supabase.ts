// types/supabase.ts
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          user_id: string;
          package_id: string;
          status: 'pending' | 'paid';
          created_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          package_id: string;
          status: 'pending' | 'paid';
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      packages: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
        };
        Insert: {
          id: string;
          name: string;
          description: string;
          price: number;
        };
        Update: Partial<Database['public']['Tables']['packages']['Insert']>;
      };
    };
  };
}
