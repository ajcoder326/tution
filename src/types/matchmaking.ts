export interface RequestData {
  parent_id: string;
  subject_id: string;
  grade: number;
  budget_min: number;
  budget_max: number;
  description?: string;
}

export interface MatchResult {
  id: string;
  request_id: string;
  tutor_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface TutorMatch {
  id: string;
  full_name: string;
  qualification: string;
  experience: number;
  hourly_rate: number;
  rating: number;
  total_reviews: number;
}