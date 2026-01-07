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

const ModeratorHomeScreen = () => {
  const stats = [
    { label: 'Pending Review', value: '24', icon: 'time-outline', color: '#F59E0B' },
    { label: 'Flagged Content', value: '12', icon: 'flag-outline', color: '#EF4444' },
    { label: 'Resolved Today', value: '45', icon: 'checkmark-circle-outline', color: '#10B981' },
    { label: 'Active Users', value: '1.2k', icon: 'people-outline', color: AppColors.primary },
  ];

  const recentActions = [
    { id: '1', type: 'Content Approved', target: 'Math Quiz #42', time: '10m ago', status: 'success' },
    { id: '2', type: 'User Warned', target: 'student_user_99', time: '25m ago', status: 'warning' },
    { id: '3', type: 'Report Resolved', target: 'Spam in Forum', time: '1h ago', status: 'success' },
    { id: '4', type: 'Content Flagged', target: 'Physics Video', time: '2h ago', status: 'error' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Moderator Panel</Text>
          <Text style={styles.subtitle}>System Health & Oversight</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#FFF" />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View Log</Text>
          </TouchableOpacity>
        </View>
        
        {recentActions.map((action) => (
          <View key={action.id} style={styles.actionItem}>
            <View style={[styles.statusDot, { 
              backgroundColor: action.status === 'success' ? '#10B981' : 
                               action.status === 'warning' ? '#F59E0B' : '#EF4444' 
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
            <Ionicons name="shield-search-outline" size={24} color={AppColors.primary} />
            <Text style={styles.toolLabel}>Audit Log</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolCard}>
            <Ionicons name="mail-unread-outline" size={24} color={AppColors.primary} />
            <Text style={styles.toolLabel}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolCard}>
            <Ionicons name="settings-outline" size={24} color={AppColors.primary} />
            <Text style={styles.toolLabel}>Rules</Text>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
  },
  seeAll: {
    color: AppColors.primary,
    fontWeight: '700',
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

export default ModeratorHomeScreen;
