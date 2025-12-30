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

const DUMMY_USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'STUDENT', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'STUDENT', status: 'Active' },
  { id: '3', name: 'Robert Johnson', email: 'robert@example.com', role: 'TEACHER', status: 'Inactive' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'STUDENT', status: 'Active' },
  { id: '5', name: 'Michael Brown', email: 'michael@example.com', role: 'STUDENT', status: 'Active' },
];

const AdminUsersScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderUserItem = ({ item }: any) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
        <View>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
      </View>
      <View style={styles.userMeta}>
        <View style={[styles.roleBadge, { backgroundColor: item.role === 'TEACHER' ? '#8B5CF620' : '#10B98120' }]}>
          <Text style={[styles.roleText, { color: item.role === 'TEACHER' ? '#8B5CF6' : '#10B981' }]}>{item.role}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color={AppColors.slate400} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Management</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="person-add" size={20} color="#FFF" />
          <Text style={styles.addButtonText}>Add User</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={AppColors.slate400} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users by name or email..."
          placeholderTextColor={AppColors.slate500}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <FilterChip label="All" active />
        <FilterChip label="Students" />
        <FilterChip label="Teachers" />
        <FilterChip label="Admins" />
      </View>

      <FlatList
        data={DUMMY_USERS}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const FilterChip = ({ label, active }: any) => (
  <TouchableOpacity style={[styles.filterChip, active && styles.activeFilterChip]}>
    <Text style={[styles.filterChipText, active && styles.activeFilterChipText]}>{label}</Text>
  </TouchableOpacity>
);

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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.slate950,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AppColors.slate900,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 24,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: AppColors.slate900,
    borderWidth: 1,
    borderColor: AppColors.slate800,
  },
  activeFilterChip: {
    backgroundColor: AppColors.primary + '20',
    borderColor: AppColors.primary + '40',
  },
  filterChipText: {
    color: AppColors.slate400,
    fontSize: 12,
    fontWeight: '700',
  },
  activeFilterChipText: {
    color: AppColors.primary,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.slate950,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.slate900,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: AppColors.slate900,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: AppColors.slate400,
    fontSize: 18,
    fontWeight: '900',
  },
  userName: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },
  userEmail: {
    color: AppColors.slate500,
    fontSize: 12,
    fontWeight: '600',
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '900',
  },
});

export default AdminUsersScreen;
