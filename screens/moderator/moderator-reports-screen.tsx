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

const ModeratorReportsScreen = () => {
  const reportTypes = [
    { title: 'System Performance', icon: 'speedometer-outline', value: '99.9%', trend: '+0.1%' },
    { title: 'User Growth', icon: 'trending-up-outline', value: '1,240', trend: '+12%' },
    { title: 'Content Quality', icon: 'star-outline', value: '4.8/5', trend: '+0.2%' },
    { title: 'Response Time', icon: 'timer-outline', value: '14m', trend: '-2m' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>System Reports</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="download-outline" size={20} color="#FFF" />
          <Text style={styles.exportText}>Export PDF</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {reportTypes.map((report, index) => (
          <View key={index} style={styles.reportCard}>
            <View style={styles.cardHeader}>
              <Ionicons name={report.icon as any} size={24} color={AppColors.primary} />
              <Text style={styles.trendText}>{report.trend}</Text>
            </View>
            <Text style={styles.reportValue}>{report.value}</Text>
            <Text style={styles.reportTitle}>{report.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.chartPlaceholder}>
        <Text style={styles.placeholderText}>Activity Visualization Placeholder</Text>
        <View style={styles.barContainer}>
          {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
            <View key={i} style={[styles.bar, { height: height }]} />
          ))}
        </View>
      </View>

      <View style={styles.recentReports}>
        <Text style={styles.sectionTitle}>Weekly Summaries</Text>
        {[1, 2, 3].map((i) => (
          <TouchableOpacity key={i} style={styles.summaryItem}>
            <View style={styles.summaryIcon}>
              <Ionicons name="document-text-outline" size={20} color={AppColors.slate400} />
            </View>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryTitle}>Week {12 - i} Performance Report</Text>
              <Text style={styles.summaryDate}>Generated on March {20 - i}, 2024</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={AppColors.slate700} />
          </TouchableOpacity>
        ))}
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
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  exportText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  reportCard: {
    width: '47%',
    backgroundColor: AppColors.slate950,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '800',
  },
  reportValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 4,
  },
  reportTitle: {
    fontSize: 12,
    color: AppColors.slate500,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  chartPlaceholder: {
    backgroundColor: AppColors.slate950,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: AppColors.slate900,
    alignItems: 'center',
  },
  placeholderText: {
    color: AppColors.slate500,
    fontWeight: '700',
    marginBottom: 24,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    height: 100,
  },
  bar: {
    width: 20,
    backgroundColor: AppColors.primary + '40',
    borderRadius: 4,
  },
  recentReports: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.slate950,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: AppColors.slate900,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryInfo: {
    flex: 1,
    marginLeft: 16,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 2,
  },
  summaryDate: {
    fontSize: 12,
    color: AppColors.slate600,
    fontWeight: '600',
  },
});

export default ModeratorReportsScreen;
