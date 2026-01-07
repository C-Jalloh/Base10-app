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
  { id: '1', code: 'MATH-402', subject: 'Mathematics', topic: 'Algebra', year: '2023', hasDiagram: true },
  { id: '2', code: 'PHYS-105', subject: 'Physics', topic: 'Mechanics', year: '2022', hasDiagram: false },
  { id: '3', code: 'CHEM-221', subject: 'Chemistry', topic: 'Organic', year: '2023', hasDiagram: true },
  { id: '4', code: 'BIO-312', subject: 'Biology', topic: 'Genetics', year: '2021', hasDiagram: false },
];

const ModeratorBankScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.subjectBadge}>
          <Text style={styles.subjectText}>{item.subject}</Text>
        </View>
        <Text style={styles.yearText}>{item.year}</Text>
      </View>

      <Text style={styles.topicText}>{item.topic}</Text>
      <View style={styles.footer}>
        <Text style={styles.codeText}>{item.code}</Text>
        {item.hasDiagram && (
          <View style={styles.diagramBadge}>
            <Ionicons name="image-outline" size={14} color={AppColors.slate500} />
            <Text style={styles.diagramText}>Diagram</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Question Bank</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={AppColors.slate500} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by code, topic, or year..."
            placeholderTextColor={AppColors.slate500}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={DUMMY_QUESTIONS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
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
    fontSize: 15,
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
  subjectBadge: {
    backgroundColor: AppColors.primary + '10',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  subjectText: {
    color: AppColors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  yearText: {
    color: AppColors.slate500,
    fontSize: 12,
    fontWeight: '700',
  },
  topicText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeText: {
    fontSize: 13,
    color: AppColors.slate600,
    fontWeight: '700',
    letterSpacing: 1,
  },
  diagramBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  diagramText: {
    fontSize: 12,
    color: AppColors.slate500,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default ModeratorBankScreen;
