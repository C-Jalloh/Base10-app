import { AppColors } from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

const TeacherAnalyticsScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Performance Analytics</Text>
        <Text style={styles.subtitle}>Overview of student progress across all classes</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Avg. Score</Text>
          <Text style={styles.statValue}>78%</Text>
          <View style={styles.trendContainer}>
            <Ionicons name="trending-up" size={14} color="#10B981" />
            <Text style={styles.trendText}>+5.2%</Text>
          </View>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Completion</Text>
          <Text style={styles.statValue}>92%</Text>
          <View style={styles.trendContainer}>
            <Ionicons name="trending-up" size={14} color="#10B981" />
            <Text style={styles.trendText}>+2.1%</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Class Performance</Text>
        {[
          { name: 'SS3 Science A', score: 85, color: '#10B981' },
          { name: 'SS3 Science B', score: 72, color: '#3B82F6' },
          { name: 'SS2 Arts A', score: 68, color: '#F59E0B' },
        ].map((item, index) => (
          <View key={index} style={styles.performanceRow}>
            <View style={styles.performanceInfo}>
              <Text style={styles.performanceName}>{item.name}</Text>
              <Text style={styles.performanceScore}>{item.score}%</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.bar, { width: `${item.score}%`, backgroundColor: item.color }]} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Performing Students</Text>
        {[
          { name: 'John Doe', class: 'SS3 Science A', score: '98%' },
          { name: 'Jane Smith', class: 'SS3 Science A', score: '96%' },
          { name: 'Samuel Ade', class: 'SS3 Science B', score: '94%' },
        ].map((student, index) => (
          <View key={index} style={styles.studentRow}>
            <View style={styles.studentAvatar}>
              <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
            </View>
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.studentClass}>{student.class}</Text>
            </View>
            <Text style={styles.studentScore}>{student.score}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: AppColors.slate500,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: AppColors.slate950,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: AppColors.slate500,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 20,
  },
  performanceRow: {
    marginBottom: 16,
  },
  performanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  performanceName: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.slate300,
  },
  performanceScore: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFF',
  },
  barContainer: {
    height: 8,
    backgroundColor: AppColors.slate900,
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.slate950,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: AppColors.primary,
    fontWeight: '800',
    fontSize: 16,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 2,
  },
  studentClass: {
    fontSize: 12,
    color: AppColors.slate500,
    fontWeight: '500',
  },
  studentScore: {
    fontSize: 16,
    fontWeight: '800',
    color: AppColors.primary,
  },
});

export default TeacherAnalyticsScreen;
