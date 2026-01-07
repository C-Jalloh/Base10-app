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

const DUMMY_CARDS = [
  { id: '1', set: 'Biology: Cell Theory', author: 'student_42', count: 12, date: '1h ago' },
  { id: '2', set: 'History: West Africa', author: 'student_88', count: 25, date: '3h ago' },
  { id: '3', set: 'Math: Trigonometry', author: 'student_12', count: 15, date: '5h ago' },
];

const ModeratorCardsScreen = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{item.count} Cards</Text>
        </View>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>

      <Text style={styles.setTitle}>{item.set}</Text>
      <Text style={styles.authorText}>Created by {item.author}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.previewButton}>
          <Text style={styles.previewButtonText}>Preview Set</Text>
        </TouchableOpacity>
        <View style={styles.decisionButtons}>
          <TouchableOpacity style={[styles.iconButton, styles.approveButton]}>
            <Ionicons name="checkmark" size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, styles.rejectButton]}>
            <Ionicons name="close" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Flashcard Review</Text>
        <Text style={styles.headerSubtitle}>Community Contributions</Text>
      </View>

      <FlatList
        data={DUMMY_CARDS}
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
  },
  headerSubtitle: {
    fontSize: 14,
    color: AppColors.slate500,
    fontWeight: '600',
    marginTop: 4,
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
  countBadge: {
    backgroundColor: AppColors.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  countText: {
    color: AppColors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  dateText: {
    color: AppColors.slate600,
    fontSize: 12,
    fontWeight: '600',
  },
  setTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  authorText: {
    fontSize: 14,
    color: AppColors.slate500,
    fontWeight: '600',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewButton: {
    backgroundColor: AppColors.slate900,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  previewButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  decisionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#10B981',
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
});

export default ModeratorCardsScreen;
