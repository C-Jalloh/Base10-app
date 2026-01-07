import { useAuth } from "@/hooks/useAuth";
import TeacherClassroomsScreen from "@/screens/teacher/teacher-classrooms-screen";
import { Redirect } from "expo-router";

export default function TeacherClassroomsRoute() {
  const { isTeacher } = useAuth();

  if (!isTeacher) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <TeacherClassroomsScreen />;
}
