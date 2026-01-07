export interface Classroom {
  id: string;
  name: string;
  subject: string;
  teacher_name?: string;
  student_count: number;
  grade_level?: string;
  role: 'student' | 'teacher';
  last_activity?: string;
  description?: string;
  progress?: number;
  class_code?: string;
  total_posts?: number;
}

export interface ClassroomStats {
  active_classrooms: number;
  total_assignments: number;
  completed_assignments: number;
  completion_percentage: number;
}

export interface StreamAttachment {
  name: string;
  type: string;
}

export interface ClassroomStreamPost {
  id: string;
  author_name: string;
  author_role: 'teacher' | 'student';
  content: string;
  created_at: string;
  type: 'announcement' | 'question' | 'assignment' | 'material';
  title?: string;
  comments_count: number;
  attachments?: StreamAttachment[];
}
