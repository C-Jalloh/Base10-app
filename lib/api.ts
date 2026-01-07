import { DUMMY_ADMIN, DUMMY_STUDENT, DUMMY_TEACHER, MOCK_USERS } from "@/mocks/users";
import { ProfileData } from "@/types/profile";

// Simple mock session state
let currentUser: ProfileData = DUMMY_TEACHER;

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
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check against mock users
    const user = MOCK_USERS.find(u => 
      (u.email === username || u.phone_number === username)
    );

    // Hardcoded passwords for mock users
    const mockPasswords: Record<string, string> = {
      "cjalloh25@gmail.com": "CJ@lloh25",
      "7834351": "CJ@lloh25",
      "esjallow03@gmail.com": "Admin@123",
      "3947425": "Admin@123",
      "sarah.kamara@base10.edu": "Teacher@123",
      "7777777": "Teacher@123"
    };

    if (user && mockPasswords[username] === password) {
      currentUser = user; // Update current user on successful login
      return {
        data: {
          access_token: `mock_token_${user.id}`,
          token_type: "bearer",
          user: user
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
  logout: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    currentUser = DUMMY_STUDENT; // Reset to default or null
    return { success: true };
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
        notification_settings: { ...DUMMY_ADMIN.notification_settings, ...settings.notification_settings },
        preferences: { ...DUMMY_ADMIN.preferences, ...settings.preferences }
      } 
    };
  },
  getActivityLogs: async (page = 1, pageSize = 25): Promise<{ data: { activities: any[], total: number, page: number, page_size: number } }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: {
        activities: [],
        total: 0,
        page,
        page_size: pageSize
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
