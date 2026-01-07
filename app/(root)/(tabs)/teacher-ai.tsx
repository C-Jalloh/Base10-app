import { useAuth } from "@/hooks/useAuth";
import TeacherAIScreen from "@/screens/teacher/teacher-ai-screen";
import { Redirect } from "expo-router";

export default function TeacherAIRoute() {
  const { isTeacher } = useAuth();

  if (!isTeacher) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <TeacherAIScreen />;
}
