import { AppColors } from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';

const DUMMY_LOGS = [
  { id: '1', action: 'User Login', user: 'esjallow03@gmail.com', time: '2 mins ago', type: 'security' },
  { id: '2', action: 'Question Created', user: 'admin_jane', time: '15 mins ago', type: 'content' },
  { id: '3', action: 'User Suspended', user: 'system', time: '1 hour ago', type: 'moderation' },
  { id: '4', action: 'Settings Updated', user: 'esjallow03@gmail.com', time: '3 hours ago', type: 'system' },
  { id: '5', action: 'New Registration', user: 'system', time: '5 hours ago', type: 'user' },
];

const AdminActivityScreen = () => {
  const renderLogItem = ({ item }: any) => (
    <View style={styles.logCard}>
      <View style={[styles.logIcon, { backgroundColor: getLogColor(item.type) + '20' }]}>
        <Ionicons name={getLogIcon(item.type)} size={20} color={getLogColor(item.type)} />
      </View>
      <View style={styles.logContent}>
        <View style={styles.logHeader}>
          <Text style={styles.logAction}>{item.action}</Text>
          <Text style={styles.logTime}>{item.time}</Text>
        </View>
        <Text style={styles.logUser}>Performed by: {item.user}</Text>
      </View>
    </View>
  );

  const getLogColor = (type: string) => {
    switch (type) {
      case 'security': return '#EF4444';
      case 'content': return '#10B981';
      case 'moderation': return '#F59E0B';
      case 'system': return '#3B82F6';
      case 'user': return '#8B5CF6';
      default: return '#64748B';
    }
  };

  const getLogIcon = (type: string): any => {
    switch (type) {
      case 'security': return 'shield-outline';
      case 'content': return 'document-text-outline';
      case 'moderation': return 'alert-circle-outline';
      case 'system': return 'settings-outline';
      case 'user': return 'person-outline';
      default: return 'list-outline';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Audit Logs</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>LIVE</Text>
        </View>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>1,240</Text>
          <Text style={styles.summaryLabel}>Total Events</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>15</Text>
          <Text style={styles.summaryLabel}>Critical</Text>
        </View>
      </View>

      <FlatList
        data={DUMMY_LOGS}
        renderItem={renderLogItem}
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
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
  },
  badge: {
    backgroundColor: '#EF444420',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#EF444440',
  },
  badgeText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    backgroundColor: AppColors.slate950,
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: AppColors.slate900,
    marginBottom: 24,
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
  },
  summaryLabel: {
    color: AppColors.slate500,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: AppColors.slate800,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logCard: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: AppColors.slate950,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.slate900,
    marginBottom: 12,
  },
  logIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logContent: {
    flex: 1,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  logAction: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },
  logTime: {
    color: AppColors.slate500,
    fontSize: 10,
    fontWeight: '600',
  },
  logUser: {
    color: AppColors.slate400,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default AdminActivityScreen;
