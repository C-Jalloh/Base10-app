import { AppColors } from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const DUMMY_ASSIGNMENTS = [
  { id: '1', title: 'Algebra Quiz 1', class: 'SS3 Science A', dueDate: 'Oct 24, 2024', submissions: 38, total: 42, status: 'Active' },
  { id: '2', title: 'Chemical Bonding', class: 'SS3 Science B', dueDate: 'Oct 25, 2024', submissions: 12, total: 38, status: 'Active' },
  { id: '3', title: 'Literature Essay', class: 'SS2 Arts A', dueDate: 'Oct 20, 2024', submissions: 45, total: 45, status: 'Graded' },
  { id: '4', title: 'Physics Lab Report', class: 'SS3 Science A', dueDate: 'Oct 18, 2024', submissions: 40, total: 42, status: 'Reviewing' },
];

const TeacherAssignmentsScreen = () => {
  const renderAssignmentItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.assignmentTitle}>{item.title}</Text>
          <Text style={styles.className}>{item.class}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="calendar-outline" size={16} color={AppColors.slate400} />
          <Text style={styles.statText}>Due: {item.dueDate}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="document-text-outline" size={16} color={AppColors.slate400} />
          <Text style={styles.statText}>{item.submissions}/{item.total} Submissions</Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${(item.submissions / item.total) * 100}%` }]} />
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#10B981';
      case 'Graded': return '#3B82F6';
      case 'Reviewing': return '#F59E0B';
      default: return AppColors.slate400;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assignments</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DUMMY_ASSIGNMENTS}
        renderItem={renderAssignmentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
  },
  createButton: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  createButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: AppColors.slate950,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  className: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.slate500,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    fontWeight: '600',
    color: AppColors.slate400,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: AppColors.slate900,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: AppColors.primary,
  },
});

export default TeacherAssignmentsScreen;
