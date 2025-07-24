export interface UIGenerationRequest {
  prompt?: string;
  image?: File;
}

export interface ValidationResult {
  is_valid: boolean;
  confidence_score: number;
  issues: string[];
  recommendations: string[];
}

export interface UIGenerationResponse {
  id: string;
  html: string;
  type: 'image' | 'text';
  validation: ValidationResult;
  retrieved_patterns: number;
  context_used: boolean;
  quality_score?: number;
  template_id?: string;
}

export interface KnowledgeBaseEntry {
  content: string;
  metadata: Record<string, any>;
}

export interface KnowledgeBaseStats {
  total_patterns: number;
  database_path: string;
  embedding_model: string;
  status: string;
}

export interface HealthStatus {
  status: string;
  service: string;
  features: string[];
  knowledge_base_ready: boolean;
}

export interface UIUpdateRequest {
  current_html: string;
  change_query: string;
  user_id?: string;
}

export interface UIUpdateResponse {
  updated_html: string;
}
