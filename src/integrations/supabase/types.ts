export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
        }
        Relationships: []
      }
      complaints: {
        Row: {
          amount: number | null
          anonymous: boolean | null
          created_at: string | null
          department: string | null
          description: string
          entity_id: string | null
          entity_name: string
          id: string
          location: string | null
          reporter_name: string | null
          status: Database["public"]["Enums"]["complaint_status"] | null
          tracking_id: string
        }
        Insert: {
          amount?: number | null
          anonymous?: boolean | null
          created_at?: string | null
          department?: string | null
          description: string
          entity_id?: string | null
          entity_name: string
          id?: string
          location?: string | null
          reporter_name?: string | null
          status?: Database["public"]["Enums"]["complaint_status"] | null
          tracking_id: string
        }
        Update: {
          amount?: number | null
          anonymous?: boolean | null
          created_at?: string | null
          department?: string | null
          description?: string
          entity_id?: string | null
          entity_name?: string
          id?: string
          location?: string | null
          reporter_name?: string | null
          status?: Database["public"]["Enums"]["complaint_status"] | null
          tracking_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaints_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entities: {
        Row: {
          avatar_url: string | null
          bio: string | null
          complaints_count: number | null
          contracts_count: number | null
          created_at: string | null
          dark_web_signals: number | null
          department: string | null
          designation: string | null
          financial_anomalies: number | null
          id: string
          location: string
          name: string
          news_hits: number | null
          political_connections: number | null
          prediction_score: number | null
          risk_level: Database["public"]["Enums"]["risk_level"] | null
          risk_score: number | null
          type: Database["public"]["Enums"]["entity_type"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          complaints_count?: number | null
          contracts_count?: number | null
          created_at?: string | null
          dark_web_signals?: number | null
          department?: string | null
          designation?: string | null
          financial_anomalies?: number | null
          id?: string
          location: string
          name: string
          news_hits?: number | null
          political_connections?: number | null
          prediction_score?: number | null
          risk_level?: Database["public"]["Enums"]["risk_level"] | null
          risk_score?: number | null
          type: Database["public"]["Enums"]["entity_type"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          complaints_count?: number | null
          contracts_count?: number | null
          created_at?: string | null
          dark_web_signals?: number | null
          department?: string | null
          designation?: string | null
          financial_anomalies?: number | null
          id?: string
          location?: string
          name?: string
          news_hits?: number | null
          political_connections?: number | null
          prediction_score?: number | null
          risk_level?: Database["public"]["Enums"]["risk_level"] | null
          risk_score?: number | null
          type?: Database["public"]["Enums"]["entity_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      news_reports: {
        Row: {
          content: string | null
          created_at: string | null
          headline: string
          id: string
          keywords: string[] | null
          linked_entities: string[] | null
          published_date: string | null
          risk_level: Database["public"]["Enums"]["risk_level"] | null
          source: string
          url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          headline: string
          id?: string
          keywords?: string[] | null
          linked_entities?: string[] | null
          published_date?: string | null
          risk_level?: Database["public"]["Enums"]["risk_level"] | null
          source: string
          url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          headline?: string
          id?: string
          keywords?: string[] | null
          linked_entities?: string[] | null
          published_date?: string | null
          risk_level?: Database["public"]["Enums"]["risk_level"] | null
          source?: string
          url?: string | null
        }
        Relationships: []
      }
      predictions: {
        Row: {
          ai_analysis: string | null
          created_at: string | null
          entity_id: string | null
          id: string
          model_used: string | null
          prediction_score: number
          risk_factors: Json | null
        }
        Insert: {
          ai_analysis?: string | null
          created_at?: string | null
          entity_id?: string | null
          id?: string
          model_used?: string | null
          prediction_score: number
          risk_factors?: Json | null
        }
        Update: {
          ai_analysis?: string | null
          created_at?: string | null
          entity_id?: string | null
          id?: string
          model_used?: string | null
          prediction_score?: number
          risk_factors?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "predictions_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      relationships: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          relationship_type: string
          source_entity_id: string | null
          strength: number | null
          target_entity_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          relationship_type: string
          source_entity_id?: string | null
          strength?: number | null
          target_entity_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          relationship_type?: string
          source_entity_id?: string | null
          strength?: number | null
          target_entity_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "relationships_source_entity_id_fkey"
            columns: ["source_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relationships_target_entity_id_fkey"
            columns: ["target_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
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
      complaint_status: "pending" | "investigating" | "resolved"
      entity_type:
        | "officer"
        | "politician"
        | "contractor"
        | "company"
        | "celebrity"
        | "business_magnate"
      risk_level: "low" | "medium" | "high"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      complaint_status: ["pending", "investigating", "resolved"],
      entity_type: [
        "officer",
        "politician",
        "contractor",
        "company",
        "celebrity",
        "business_magnate",
      ],
      risk_level: ["low", "medium", "high"],
    },
  },
} as const
