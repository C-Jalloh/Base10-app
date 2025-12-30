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

const DUMMY_QUESTIONS = [
  { id: '1', subject: 'Mathematics', topic: 'Calculus', difficulty: 'Hard', status: 'Published' },
  { id: '2', subject: 'Physics', topic: 'Mechanics', difficulty: 'Medium', status: 'Draft' },
  { id: '3', subject: 'Chemistry', topic: 'Organic', difficulty: 'Easy', status: 'Published' },
  { id: '4', subject: 'Biology', topic: 'Genetics', difficulty: 'Medium', status: 'Published' },
  { id: '5', subject: 'English', topic: 'Grammar', difficulty: 'Easy', status: 'Published' },
];

const AdminQuestionsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderQuestionItem = ({ item }: any) => (
    <View style={styles.questionCard}>
      <View style={styles.questionInfo}>
        <View style={[styles.subjectIcon, { backgroundColor: getSubjectColor(item.subject) + '20' }]}>
          <Ionicons name="document-text" size={20} color={getSubjectColor(item.subject)} />
        </View>
        <View>
          <Text style={styles.topicText}>{item.topic}</Text>
          <Text style={styles.subjectText}>{item.subject} • {item.difficulty}</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Published' ? '#10B98120' : '#F59E0B20' }]}>
          <Text style={[styles.statusText, { color: item.status === 'Published' ? '#10B981' : '#F59E0B' }]}>{item.status}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={20} color={AppColors.slate400} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Mathematics': return '#3B82F6';
      case 'Physics': return '#8B5CF6';
      case 'Chemistry': return '#F59E0B';
      case 'Biology': return '#10B981';
      default: return '#64748B';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Question Bank</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>New</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={AppColors.slate400} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search questions..."
          placeholderTextColor={AppColors.slate500}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>850</Text>
          <Text style={styles.miniStatLabel}>Total</Text>
        </View>
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>12</Text>
          <Text style={styles.miniStatLabel}>Drafts</Text>
        </View>
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>45</Text>
          <Text style={styles.miniStatLabel}>New Today</Text>
        </View>
      </View>

      <FlatList
        data={DUMMY_QUESTIONS}
        renderItem={renderQuestionItem}
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
    gap: 4,
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
    marginBottom: 20,
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
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  miniStat: {
    flex: 1,
    backgroundColor: AppColors.slate900,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.slate800,
  },
  miniStatValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
  },
  miniStatLabel: {
    color: AppColors.slate500,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  questionCard: {
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
  questionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subjectIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },
  subjectText: {
    color: AppColors.slate500,
    fontSize: 12,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
  },
});

export default AdminQuestionsScreen;
