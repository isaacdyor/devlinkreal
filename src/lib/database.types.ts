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
      _collaborated_projects: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_collaborated_projects_A_fkey"
            columns: ["A"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_collaborated_projects_B_fkey"
            columns: ["B"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          }
        ]
      }
      comment: {
        Row: {
          content: string
          created_at: string
          id: string
          profile_id: string
          project_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id: string
          profile_id: string
          project_id: string
          updated_at: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          profile_id?: string
          project_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          bio: string
          created_at: string
          email: string
          first_name: string
          github: string | null
          id: string
          last_name: string
          linkedin: string | null
          profile_pic: string | null
          role: Database["public"]["Enums"]["RoleType"]
          skills: string[] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          bio: string
          created_at?: string
          email: string
          first_name: string
          github?: string | null
          id: string
          last_name: string
          linkedin?: string | null
          profile_pic?: string | null
          role: Database["public"]["Enums"]["RoleType"]
          skills?: string[] | null
          updated_at: string
          website?: string | null
        }
        Update: {
          bio?: string
          created_at?: string
          email?: string
          first_name?: string
          github?: string | null
          id?: string
          last_name?: string
          linkedin?: string | null
          profile_pic?: string | null
          role?: Database["public"]["Enums"]["RoleType"]
          skills?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      project: {
        Row: {
          created_at: string
          description: string
          id: string
          image: string | null
          profile_id: string
          repo: string | null
          skills_needed: string[] | null
          skills_provided: string[] | null
          stack: string[] | null
          status: Database["public"]["Enums"]["ProjectStatusType"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id: string
          image?: string | null
          profile_id: string
          repo?: string | null
          skills_needed?: string[] | null
          skills_provided?: string[] | null
          stack?: string[] | null
          status: Database["public"]["Enums"]["ProjectStatusType"]
          title: string
          updated_at: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image?: string | null
          profile_id?: string
          repo?: string | null
          skills_needed?: string[] | null
          skills_provided?: string[] | null
          stack?: string[] | null
          status?: Database["public"]["Enums"]["ProjectStatusType"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
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
      ProjectStatusType: "PLANNING" | "BUILDING" | "COMPLETED"
      RoleType: "FRONTEND" | "BACKEND" | "DESIGN" | "FULLSTACK"
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
