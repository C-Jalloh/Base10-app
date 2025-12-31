import { AppColors } from "@/constants/app-colors";
import { authApi } from "@/lib/api";
import { ProfileData } from "@/types/profile";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const TeacherHomeScreen = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await authApi.getProfile();
      setProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch teacher data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="brain" size={24} color="#FFF" />
          </View>
          <View>
            <Text style={styles.brandName}>Base10</Text>
            <View style={styles.badge}>
              <View style={styles.pulseDot} />
              <Text style={styles.badgeText}>TEACHER CONSOLE</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#FFF" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.subGreeting}>Welcome back, {profile?.full_name}</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard 
          title="Total Classes" 
          value="4" 
          trend="+1" 
          icon="school" 
          color="#3B82F6" 
        />
        <StatCard 
          title="Total Students" 
          value="156" 
          trend="+12" 
          icon="people" 
          color={AppColors.primary} 
        />
        <StatCard 
          title="Assignments" 
          value="8" 
          trend="Active" 
          icon="document-text" 
          color="#F59E0B" 
        />
        <StatCard 
          title="Avg. Score" 
          value="72%" 
          trend="+5%" 
          icon="stats-chart" 
          color="#8B5CF6" 
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.actionGrid}>
          <ActionItem icon="add-circle" label="New Class" color="#3B82F6" />
          <ActionItem icon="create" label="Assignment" color={AppColors.primary} />
          <ActionItem icon="cloud-upload" label="Materials" color="#F59E0B" />
          <ActionItem icon="mail" label="Message" color="#8B5CF6" />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activityList}>
          <DeadlineItem 
            title="Mathematics Quiz #4" 
            time="Tomorrow, 11:59 PM" 
            classroom="SS3 Science A" 
          />
          <DeadlineItem 
            title="Physics Assignment" 
            time="Friday, 4:00 PM" 
            classroom="SS3 Science B" 
          />
        </View>
      </View>
    </ScrollView>
  );
};

const StatCard = ({ title, value, trend, icon, color }: any) => (
  <View style={styles.statCard}>
    <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{title}</Text>
    <Text style={[styles.statTrend, { color: trend.startsWith('+') ? AppColors.primary : AppColors.slate400 }]}>
      {trend}
    </Text>
  </View>
);

const ActionItem = ({ icon, label, color }: any) => (
  <TouchableOpacity style={styles.actionItem}>
    <View style={[styles.actionIcon, { backgroundColor: color + '10' }]}>
      <Ionicons name={icon} size={28} color={color} />
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const DeadlineItem = ({ title, time, classroom }: any) => (
  <View style={styles.activityItem}>
    <View style={styles.activityIconContainer}>
      <Ionicons name="time-outline" size={20} color={AppColors.primary} />
    </View>
    <View style={styles.activityContent}>
      <View style={styles.activityHeader}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
      <Text style={styles.activityDescription}>{classroom}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: -0.5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: AppColors.slate500,
    letterSpacing: 1.5,
  },
  welcomeSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  subGreeting: {
    fontSize: 14,
    color: AppColors.slate400,
    fontWeight: '600',
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: AppColors.slate900,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.slate800,
  },
  notificationBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColors.primary,
    borderWidth: 2,
    borderColor: AppColors.slate900,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    width: '48%',
    backgroundColor: AppColors.slate950,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
    color: AppColors.slate400,
    marginBottom: 8,
  },
  statTrend: {
    fontSize: 10,
    fontWeight: '900',
  },
  section: {
    paddingHorizontal: 24,
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
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: -0.5,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '700',
    color: AppColors.primary,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionItem: {
    width: '22%',
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  actionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: AppColors.slate400,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: AppColors.slate950,
    borderRadius: 20,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: AppColors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  activityTime: {
    fontSize: 10,
    color: AppColors.slate500,
    fontWeight: '600',
  },
  activityDescription: {
    fontSize: 12,
    color: AppColors.slate400,
    lineHeight: 18,
  },
});

export default TeacherHomeScreen;
