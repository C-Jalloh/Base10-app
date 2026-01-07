import { AppColors } from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const ModeratorOverviewScreen = () => {
  const queueStats = [
    { label: 'Question Reports', value: '42', icon: 'flag-outline', color: '#EF4444' },
    { label: 'Flashcard Review', value: '18', icon: 'copy-outline', color: '#F59E0B' },
    { label: 'Pending Assets', value: '7', icon: 'image-outline', color: AppColors.primary },
    { label: 'Resolved Today', value: '124', icon: 'checkmark-done-outline', color: '#10B981' },
  ];

  const recentActions = [
    { id: '1', type: 'Resolved Report', target: 'Math Q#402', time: '5m ago', status: 'success' },
    { id: '2', type: 'Approved Card', target: 'Biology Set', time: '12m ago', status: 'success' },
    { id: '3', type: 'Rejected Card', target: 'History Set', time: '45m ago', status: 'error' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Moderator Queue</Text>
          <Text style={styles.subtitle}>Quality Control Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#FFF" />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        {queueStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
              <Ionicons name={stat.icon as any} size={20} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Actions</Text>
        {recentActions.map((action) => (
          <View key={action.id} style={styles.actionItem}>
            <View style={[styles.statusDot, { 
              backgroundColor: action.status === 'success' ? '#10B981' : '#EF4444' 
            }]} />
            <View style={styles.actionInfo}>
              <Text style={styles.actionType}>{action.type}</Text>
              <Text style={styles.actionTarget}>{action.target}</Text>
            </View>
            <Text style={styles.actionTime}>{action.time}</Text>
          </View>
        ))}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Tools</Text>
        <View style={styles.toolsGrid}>
          <TouchableOpacity style={styles.toolCard}>
            <Ionicons name="add-circle-outline" size={24} color={AppColors.primary} />
            <Text style={styles.toolLabel}>Add Question</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolCard}>
            <Ionicons name="cloud-upload-outline" size={24} color={AppColors.primary} />
            <Text style={styles.toolLabel}>Upload Assets</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.slate400,
    fontWeight: '600',
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: AppColors.slate950,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  badge: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: AppColors.slate950,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    width: '47%',
    backgroundColor: AppColors.slate950,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: AppColors.slate500,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.slate950,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 16,
  },
  actionInfo: {
    flex: 1,
  },
  actionType: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 2,
  },
  actionTarget: {
    fontSize: 13,
    color: AppColors.slate500,
    fontWeight: '600',
  },
  actionTime: {
    fontSize: 12,
    color: AppColors.slate600,
    fontWeight: '600',
  },
  quickActions: {
    marginBottom: 20,
  },
  toolsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  toolCard: {
    flex: 1,
    backgroundColor: AppColors.slate950,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  toolLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 8,
  },
});

export default ModeratorOverviewScreen;
