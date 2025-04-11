export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      packages: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          created_at: string
          content: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          created_at?: string
          content: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          created_at?: string
          content: string
        }
        Relationships: []
      }

      orders: {
        Row: {
          id: string
          user_id: string
          package_id: string
          status: 'pending' | 'paid'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          package_id: string
          status?: 'pending' | 'paid'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          package_id?: string
          status?: 'pending' | 'paid'
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'orders_package_id_fkey'
            columns: ['package_id']
            referencedRelation: 'packages'
            referencedColumns: ['id']
          }
        ]
      }
    }

    Views: {}
    Functions: {}
    Enums: {}
  }
}
