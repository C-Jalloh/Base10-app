import { authApi } from "@/lib/api";
import { ProfileData } from "@/types/profile";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authApi.getProfile();
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading, isAdmin: user?.role === 'ADMIN' };
};
