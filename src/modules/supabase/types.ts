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
      collections: {
        Row: {
          category: string | null
          created_at: string
          id: number
          trick_id: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: number
          trick_id: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: number
          trick_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collections_trick_id_fkey"
            columns: ["trick_id"]
            isOneToOne: false
            referencedRelation: "tricks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      creator_platforms: {
        Row: {
          created_at: string
          creator: number | null
          id: number
          platform: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          creator?: number | null
          id?: number
          platform?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          creator?: number | null
          id?: number
          platform?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creator_platforms_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          }
        ]
      }
      creator_tricks: {
        Row: {
          creator_id: number
          trick_id: string
        }
        Insert: {
          creator_id: number
          trick_id: string
        }
        Update: {
          creator_id?: number
          trick_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_tricks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_tricks_trick_id_fkey"
            columns: ["trick_id"]
            isOneToOne: false
            referencedRelation: "tricks"
            referencedColumns: ["id"]
          }
        ]
      }
      creators: {
        Row: {
          bio: string | null
          created_at: string
          id: number
          name: string | null
          picture: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: number
          name?: string | null
          picture?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: number
          name?: string | null
          picture?: string | null
        }
        Relationships: []
      }
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
          creator: number | null
          externalId: string | null
          id: number
          source: string | null
          title: string | null
          trickId: string | null
        }
        Insert: {
          created_at?: string
          creator?: number | null
          externalId?: string | null
          id?: number
          source?: string | null
          title?: string | null
          trickId?: string | null
        }
        Update: {
          created_at?: string
          creator?: number | null
          externalId?: string | null
          id?: number
          source?: string | null
          title?: string | null
          trickId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "videos_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_trickId_fkey"
            columns: ["trickId"]
            isOneToOne: false
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
      add_trick_to_collections: {
        Args: {
          p_user_id: string
          p_trick_id: string
          p_category: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
