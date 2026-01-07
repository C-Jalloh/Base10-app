export interface PerformanceTrends {
  daily: { attempts: number; accuracy: number };
  weekly: { attempts: number; accuracy: number };
  monthly: { attempts: number; accuracy: number };
}

export interface TopicMastery {
  topic: string;
  subject: string;
  mastery_level: 'expert' | 'proficient' | 'developing';
  accuracy: number;
}

export interface ExamReadiness {
  readiness_score: number;
  readiness_level: string;
  days_until_exam: number;
}

export interface TimeAnalytics {
  total_study_time_minutes: number;
  average_time_per_question_seconds: number;
  patterns: {
    guessing_instances: number;
    guessing_rate: number;
  };
}

export interface ClassmateComparison {
  your_accuracy: number;
  class_average_accuracy: number;
  your_rank: number;
  percentile: number;
}

export interface Recommendation {
  priority: 'high' | 'normal' | 'low';
  title: string;
  message: string;
}

export interface RadarDataPoint {
  subject: string;
  value: number;
  fullMark: number;
}

export interface DashboardData {
  total_attempts: number;
  overall_accuracy: number;
  streak_days: number;
  study_time_hours: number;
  due_reviews: number;
  today_attempts: number;
  has_target_exam: boolean;
  performance_trends: PerformanceTrends;
  topic_mastery: TopicMastery[];
  exam_readiness: ExamReadiness;
  time_analytics: TimeAnalytics;
  classmate_comparison: ClassmateComparison;
  recommendations?: Recommendation[];
  radar_data: RadarDataPoint[];
}

export interface SubjectStat {
  subject_name: string;
  total_attempts: number;
  accuracy: number;
  mastery_level: string;
  top_topics: string[];
}
