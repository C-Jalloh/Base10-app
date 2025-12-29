import { ProfileData } from "@/types/profile";

export const DUMMY_USER: ProfileData = {
  id: 1,
  full_name: "C Jalloh",
  email: "cjalloh25@gmail.com",
  phone_number: "7834351",
  avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=C%20Jalloh",
  bio: "Passionate student aiming for excellence in WASSCE. I love learning new things and exploring AI.",
  is_verified: true,
  education_level: "SSS3",
  learning_style: "Visual",
  preferred_subjects: ["Mathematics", "Physics", "Computer Science"],
  study_time_preference: "Evening",
  target_exam_date: "2026-05-15T00:00:00.000Z",
  level: 5,
  total_points: 1250,
  study_streak: 12,
  profile_completion_percentage: 85,
  achievement_badges: ["Early Bird", "Math Whiz", "Streak Master"],
  notification_settings: {
    email_enabled: true,
    sms_enabled: false,
    push_enabled: true,
    daily_reminder: true,
    weekly_progress: true,
    exam_countdown: true,
    achievement_alerts: true,
  },
  privacy_settings: {
    show_profile: true,
    show_progress: true,
    show_in_leaderboard: true,
    allow_classmate_comparison: true,
  },
  country: "Sierra Leone",
  location: "Freetown",
  created_at: new Date().toISOString(),
};

export const API_BASE_URL = 'http://localhost:8000/api/v1'; // Update this with your actual API URL

export const authApi = {
  getProfile: async (): Promise<{ data: ProfileData }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: DUMMY_USER };
  },
  updateProfile: async (profileData: Partial<ProfileData>): Promise<{ data: ProfileData }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { data: { ...DUMMY_USER, ...profileData } };
  },
  login: async (username: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (
      (username === "cjalloh25@gmail.com" || username === "7834351") &&
      password === "CJ@lloh25"
    ) {
      return {
        data: {
          access_token: "mock_token_12345",
          token_type: "bearer",
          user: DUMMY_USER
        }
      };
    } else {
      throw {
        response: {
          data: {
            detail: "Invalid email/phone or password"
          }
        }
      };
    }
  },
  register: async (userData: any) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      data: {
        message: "User registered successfully",
        user: { ...userData, id: 101 }
      }
    };
  },
  resetPassword: async (email: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      data: {
        message: "Reset link sent successfully"
      }
    };
  }
};

export const assetApi = {
  getImageUrl: (filename: string, options?: { quality?: string; network?: string }) => {
    const params = new URLSearchParams(options as any);
    const queryString = params.toString();
    return `${API_BASE_URL}/assets/image/${filename}${queryString ? `?${queryString}` : ''}`;
  }
};
