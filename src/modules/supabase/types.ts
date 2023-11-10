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
      tricks: {
        Row: {
          created_at: string
          difficulty: string | null
          id: string
          name: string
          prerequisites: string[] | null
          preview: string | null
          types: string[] | null
        }
        Insert: {
          created_at?: string
          difficulty?: string | null
          id: string
          name: string
          prerequisites?: string[] | null
          preview?: string | null
          types?: string[] | null
        }
        Update: {
          created_at?: string
          difficulty?: string | null
          id?: string
          name?: string
          prerequisites?: string[] | null
          preview?: string | null
          types?: string[] | null
        }
        Relationships: []
      }
      videos: {
        Row: {
          created_at: string
          externalId: string | null
          id: number
          source: string | null
          trickId: string | null
        }
        Insert: {
          created_at?: string
          externalId?: string | null
          id?: number
          source?: string | null
          trickId?: string | null
        }
        Update: {
          created_at?: string
          externalId?: string | null
          id?: number
          source?: string | null
          trickId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "videos_trickId_fkey"
            columns: ["trickId"]
            referencedRelation: "tricks"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
