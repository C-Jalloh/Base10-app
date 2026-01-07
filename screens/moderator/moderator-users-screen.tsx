import { AppColors } from "@/constants/app-colors";
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const DUMMY_REPORTS = [
  { id: '1', user: 'Musa Jallow', reason: 'Inappropriate Language', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Musa' },
  { id: '2', user: 'Fatima Bah', reason: 'Spamming in Class', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima' },
  { id: '3', user: 'Alieu Sowe', reason: 'Harassment', status: 'resolved', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alieu' },
];

const ModeratorUsersScreen = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.reportCard}>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.reportReason}>{item.reason}</Text>
        </View>
        <View style={[styles.statusBadge, { 
          backgroundColor: item.status === 'active' ? '#EF444420' : '#10B98120' 
        }]}>
          <Text style={[styles.statusText, { 
            color: item.status === 'active' ? '#EF4444' : '#10B981' 
          }]}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Take Action</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Reports</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Resolved</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={DUMMY_REPORTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
    padding: 24,
    paddingTop: 60,
    backgroundColor: AppColors.slate950,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: AppColors.background,
    padding: 4,
    borderRadius: 12,
    gap: 4,
  },
  tab: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: AppColors.slate900,
  },
  tabText: {
    color: AppColors.slate500,
    fontWeight: '700',
    fontSize: 14,
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  list: {
    padding: 20,
    paddingBottom: 100,
  },
  reportCard: {
    backgroundColor: AppColors.slate950,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.slate900,
  },
  userDetails: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFF',
  },
  reportReason: {
    fontSize: 13,
    color: AppColors.slate500,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    height: 40,
    backgroundColor: AppColors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    height: 40,
    backgroundColor: AppColors.slate900,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default ModeratorUsersScreen;
