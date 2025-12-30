export interface ProfileData {
  // Core Identity
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  username?: string;
  role: 'STUDENT' | 'ADMIN' | 'TEACHER';
  avatar_url?: string;
  bio?: string;
  is_verified: boolean;
  is_active?: boolean;

  // Academic & Learning (Student Specific)
  education_level?: string; // e.g., "SSS1", "SSS2", "SSS3", "Graduate"
  learning_style?: string; // e.g., "Visual", "Auditory", "Reading", "Kinesthetic"
  preferred_subjects?: string[];
  study_time_preference?: string;
  target_exam_date?: string; // ISO date string

  // Gamification & Progress (Student Specific)
  level?: number;
  total_points?: number;
  study_streak?: number;
  profile_completion_percentage?: number;
  achievement_badges?: string[];

  // Admin Specific
  last_login?: string;
  total_actions_performed?: number;
  last_action_at?: string | null;

  // Settings
  notification_settings: {
    email_enabled: boolean;
    sms_enabled?: boolean;
    push_enabled?: boolean;
    daily_reminder?: boolean;
    weekly_progress?: boolean;
    exam_countdown?: boolean;
    achievement_alerts?: boolean;
    system_alerts?: boolean;
    user_reports?: boolean;
    new_registrations?: boolean;
    performance_alerts?: boolean;
    security_alerts?: boolean;
  };
  privacy_settings?: {
    show_profile: boolean;
    show_progress: boolean;
    show_in_leaderboard: boolean;
    allow_classmate_comparison: boolean;
  };
  preferences?: {
    theme: 'light' | 'dark';
    default_view: string;
    items_per_page: number;
    auto_refresh_interval: number;
    show_advanced_metrics: boolean;
    timezone: string;
  };

  // Location & Metadata
  country: string;
  location: string;
  created_at: string;
}
