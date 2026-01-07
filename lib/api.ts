import { DUMMY_ADMIN, DUMMY_MODERATOR, DUMMY_STUDENT, MOCK_USERS } from "@/mocks/users";
import { ProfileData } from "@/types/profile";

// Simple mock session state
let currentUser: ProfileData = DUMMY_MODERATOR;

export const DUMMY_USER = currentUser;

export const API_BASE_URL = 'http://localhost:8000/api/v1'; // Update this with your actual API URL

export const authApi = {
  getProfile: async (): Promise<{ data: ProfileData }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: currentUser };
  },
  updateProfile: async (profileData: Partial<ProfileData>): Promise<{ data: ProfileData }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    currentUser = { ...currentUser, ...profileData };
    return { data: currentUser };
  },
  login: async (username: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const user = MOCK_USERS.find(u => (u.email === username || u.phone_number === username));
    const mockPasswords: Record<string, string> = {
      "cjalloh25@gmail.com": "CJ@lloh25",
      "7834351": "CJ@lloh25",
      "esjallow03@gmail.com": "Admin@123",
      "3947425": "Admin@123",
      "sarah.kamara@base10.edu": "Teacher@123",
      "7777777": "Teacher@123",
      "john.mod@base10.edu": "Mod@123",
      "8888888": "Mod@123"
    };
    if (user && mockPasswords[username] === password) {
      currentUser = user;
      return { data: { access_token: `mock_token_${user.id}`, token_type: "bearer", user: user } };
    } else {
      throw { response: { data: { detail: "Invalid email/phone or password" } } };
    }
  },
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    currentUser = DUMMY_STUDENT;
    return { success: true };
  },
  register: async (userData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { data: { message: "User registered successfully", user: { ...userData, id: 101 } } };
  },
  resetPassword: async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { data: { message: "Reset link sent successfully" } };
  }
};

export const adminApi = {
  getProfile: async (): Promise<{ data: ProfileData }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: DUMMY_ADMIN };
  },
  updateProfile: async (updates: Partial<ProfileData>): Promise<{ data: ProfileData }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { ...DUMMY_ADMIN, ...updates } };
  },
  updateSettings: async (settings: any): Promise<{ data: ProfileData }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { 
      data: { 
        ...DUMMY_ADMIN, 
        notification_settings: { ...DUMMY_ADMIN.notification_settings, ...settings?.notification_settings },
        preferences: { ...(DUMMY_ADMIN as any).preferences, ...settings?.preferences }
      } 
    };
  },
  getActivityLogs: async (page = 1, pageSize = 25): Promise<{ data: { activities: any[], total: number, page: number, page_size: number } }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { activities: [], total: 0, page, page_size: pageSize } };
  }
};

export const studentApi = {
  getDashboard: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      data: {
        total_attempts: 1240,
        overall_accuracy: 82,
        streak_days: 14,
        study_time_hours: 45.5,
        due_reviews: 5,
        today_attempts: 12,
        has_target_exam: true,
        performance_trends: {
          daily: { attempts: 12, accuracy: 70 },
          weekly: { attempts: 85, accuracy: 78 },
          monthly: { attempts: 340, accuracy: 82 }
        },
        topic_mastery: [
          { topic: 'Algebra', subject: 'Mathematics', mastery_level: 'expert', accuracy: 85 },
          { topic: 'Calculus', subject: 'Mathematics', mastery_level: 'proficient', accuracy: 72 },
          { topic: 'Mechanics', subject: 'Physics', mastery_level: 'developing', accuracy: 45 },
          { topic: 'Waves', subject: 'Physics', mastery_level: 'developing', accuracy: 48 },
          { topic: 'Organic Chemistry', subject: 'Chemistry', mastery_level: 'developing', accuracy: 42 }
        ],
        exam_readiness: {
          readiness_score: 86,
          readiness_level: 'PRO_LEVEL',
          days_until_exam: 15
        },
        time_analytics: {
          total_study_time_minutes: 2730,
          average_time_per_question_seconds: 45,
          patterns: { guessing_instances: 12, guessing_rate: 3 }
        },
        classmate_comparison: {
          your_accuracy: 82,
          class_average_accuracy: 72,
          your_rank: 12,
          percentile: 5
        },
        radar_data: [
          { subject: 'Math', value: 85, fullMark: 100 },
          { subject: 'Eng', value: 75, fullMark: 100 },
          { subject: 'Phys', value: 45, fullMark: 100 },
          { subject: 'Chem', value: 65, fullMark: 100 },
          { subject: 'Bio', value: 90, fullMark: 100 },
        ]
      }
    };
  },
  getSubjects: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      data: [
        { subject_name: 'Mathematics', total_attempts: 10, accuracy: 85, mastery_level: 'Expert', top_topics: ['Algebra', 'Calculus'] },
        { subject_name: 'Physics', total_attempts: 8, accuracy: 45, mastery_level: 'Developing', top_topics: ['Mechanics', 'Waves'] },
        { subject_name: 'Biology', total_attempts: 6, accuracy: 75, mastery_level: 'Proficient', top_topics: ['Genetics', 'Ecology'] }
      ]
    };
  }
};

export const aiApi = {
  getRecommendations: async () => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return {
      data: [
        { priority: 'high', title: 'Focus on Organic Chemistry', message: 'Your accuracy in Organic Chemistry is lower than other Chemistry topics. Reviewing mechanics could boost your score by 15%.' },
        { priority: 'normal', title: 'Review Geometry Mistakes', message: 'You have made similar mistakes in Geometry recently. A quick review of circle theorems is recommended.' }
      ]
    };
  }
};

export const assetApi = {
  getImageUrl: (filename: string, options?: { quality?: string; network?: string }) => {
    const params = new URLSearchParams(options as any);
    const queryString = params.toString();
    return `${API_BASE_URL}/assets/image/${filename}${queryString ? '?' + queryString : ''}`;
  }
};
