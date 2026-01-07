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

const DUMMY_CONTENT = [
  { id: '1', title: 'Algebra Basics Quiz', author: 'Teacher Sarah', type: 'Quiz', status: 'pending', date: '2024-03-20' },
  { id: '2', title: 'Newtonian Physics', author: 'Teacher John', type: 'Video', status: 'flagged', date: '2024-03-19' },
  { id: '3', title: 'English Grammar PDF', author: 'Teacher Mary', type: 'Document', status: 'pending', date: '2024-03-18' },
  { id: '4', title: 'Chemical Bonding', author: 'Teacher David', type: 'Quiz', status: 'pending', date: '2024-03-17' },
];

const ModeratorContentScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.typeBadge}>
          <Ionicons 
            name={item.type === 'Quiz' ? 'help-circle' : item.type === 'Video' ? 'play-circle' : 'document-text'} 
            size={14} 
            color={AppColors.primary} 
          />
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
        <View style={[styles.statusBadge, { 
          backgroundColor: item.status === 'flagged' ? '#EF444420' : '#F59E0B20' 
        }]}>
          <Text style={[styles.statusText, { 
            color: item.status === 'flagged' ? '#EF4444' : '#F59E0B' 
          }]}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>By {item.author} • {item.date}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, styles.approveButton]}>
          <Ionicons name="checkmark" size={18} color="#FFF" />
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
          <Ionicons name="close" size={18} color="#FFF" />
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Content Review</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={AppColors.slate500} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search content..."
            placeholderTextColor={AppColors.slate500}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={DUMMY_CONTENT}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
    padding: 24,
    paddingTop: 60,
    backgroundColor: AppColors.slate950,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.slate900,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: '#FFF',
    fontSize: 16,
  },
  list: {
    padding: 20,
    paddingBottom: 100,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.primary + '10',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  typeText: {
    color: AppColors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: AppColors.slate500,
    fontWeight: '600',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 12,
    gap: 8,
  },
  approveButton: {
    backgroundColor: '#10B981',
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ModeratorContentScreen;
