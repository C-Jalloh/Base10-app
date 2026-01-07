import { useAuth } from "@/hooks/useAuth";
import TeacherAssignmentsScreen from "@/screens/teacher/teacher-assignments-screen";
import { Redirect } from "expo-router";

export default function TeacherAssignmentsRoute() {
  const { isTeacher } = useAuth();

  if (!isTeacher) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <TeacherAssignmentsScreen />;
}
