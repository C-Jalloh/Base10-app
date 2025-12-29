export const DUMMY_USER = {
  phone_number: "7834351",
  email: "cjalloh25@gmail.com",
  username: "cjalloh25",
  full_name: "C Jalloh",
  role: "student",
  id: 1,
  is_active: true,
  is_verified: true,
  is_onboarded: true,
  onboarding_step: 3,
  ai_quota_limit: 50,
  ai_quota_used: 5,
  created_at: new Date().toISOString()
};

export const API_BASE_URL = 'http://localhost:8000/api/v1'; // Update this with your actual API URL

export const authApi = {
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
