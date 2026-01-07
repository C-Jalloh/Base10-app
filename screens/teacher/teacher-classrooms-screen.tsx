import { AppColors } from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const DUMMY_CLASSES = [
  { id: '1', name: 'SS3 Science A', students: 42, code: 'SCI-A-2024', active: true },
  { id: '2', name: 'SS3 Science B', students: 38, code: 'SCI-B-2024', active: true },
  { id: '3', name: 'SS2 Arts A', students: 45, code: 'ART-A-2024', active: true },
  { id: '4', name: 'SS1 General', students: 31, code: 'GEN-2024', active: false },
];

const TeacherClassroomsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>My Classrooms</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={AppColors.slate400} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search classrooms..."
          placeholderTextColor={AppColors.slate500}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.analyticsSection}>
        <Text style={styles.sectionTitle}>Performance Overview</Text>
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
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 16 }]}>All Classes</Text>
    </View>
  );

  const renderClassItem = ({ item }: any) => (
    <TouchableOpacity style={styles.classCard}>
      <View style={styles.classHeader}>
        <View style={styles.classInfo}>
          <Text style={styles.className}>{item.name}</Text>
          <Text style={styles.classCode}>Code: {item.code}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.active ? '#10B98120' : '#EF444420' }]}>
          <Text style={[styles.statusText, { color: item.active ? '#10B981' : '#EF4444' }]}>
            {item.active ? 'Active' : 'Archived'}
          </Text>
        </View>
      </View>
      
      <View style={styles.classFooter}>
        <View style={styles.studentCount}>
          <Ionicons name="people-outline" size={16} color={AppColors.slate400} />
          <Text style={styles.studentCountText}>{item.students} Students</Text>
        </View>
        <TouchableOpacity style={styles.manageButton}>
          <Text style={styles.manageButtonText}>Manage</Text>
          <Ionicons name="chevron-forward" size={14} color={AppColors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_CLASSES}
        renderItem={renderClassItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.slate950,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 50,
    borderWidth: 1,
    borderColor: AppColors.slate900,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  analyticsSection: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: AppColors.slate950,
    borderRadius: 20,
    padding: 16,
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
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 4,
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
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  classCard: {
    backgroundColor: AppColors.slate950,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  classCode: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 1,
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
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: AppColors.slate900,
  },
  studentCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  studentCountText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.slate400,
  },
  manageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  manageButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: AppColors.primary,
  },
});

export default TeacherClassroomsScreen;
