import { AppColors } from "@/constants/app-colors";
import { aiApi, authApi, studentApi } from "@/lib/api";
import { DashboardData, RadarDataPoint, SubjectStat } from "@/types/dashboard";
import { ProfileData } from "@/types/profile";
import { AppButton, AppCard, AppText, AppBadge, IconButton } from "@/components/ui";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { G, Line, Polygon, Text as SvgText } from 'react-native-svg';

const RadarChart = ({ data }: { data: RadarDataPoint[] }) => {
    const size = 160;
    const center = size / 2;
    const radius = center * 0.6;
    const N = data.length;

    const points = data.map((d, i) => {
        const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
        const valueRatio = d.value / d.fullMark;
        return {
            x: center + radius * valueRatio * Math.cos(angle),
            y: center + radius * valueRatio * Math.sin(angle),
            labelX: center + radius * 1.3 * Math.cos(angle),
            labelY: center + radius * 1.3 * Math.sin(angle),
            gridX: center + radius * Math.cos(angle),
            gridY: center + radius * Math.sin(angle),
        };
    });

    const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 160 }}>
            <Svg width={size} height={size}>
                <G>
                    {/* Grid lines */}
                    {[0.2, 0.4, 0.6, 0.8, 1].map((tick) => {
                        const tickPoints = data.map((_, i) => {
                            const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
                            return `${center + radius * tick * Math.cos(angle)},${center + radius * tick * Math.sin(angle)}`;
                        }).join(' ');
                        return (
                            <Polygon
                                key={tick}
                                points={tickPoints}
                                fill="none"
                                stroke={AppColors.slate800}
                                strokeWidth="0.5"
                            />
                        );
                    })}

                    {/* Axis lines */}
                    {points.map((p, i) => (
                        <Line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={p.gridX}
                            y2={p.gridY}
                            stroke={AppColors.slate800}
                            strokeWidth="0.5"
                        />
                    ))}

                    {/* Value Polygon */}
                    <Polygon
                        points={polygonPoints}
                        fill={`${AppColors.primary}33`}
                        stroke={AppColors.primary}
                        strokeWidth="2"
                    />

                    {/* Labels */}
                    {points.map((p, i) => (
                        <SvgText
                            key={i}
                            x={p.labelX}
                            y={p.labelY}
                            fill={AppColors.slate500}
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                        >
                            {data[i].subject}
                        </SvgText>
                    ))}
                </G>
            </Svg>
        </View>
    );
};

const HomeScreen = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [subjectStats, setSubjectStats] = useState<SubjectStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeMode, setActiveMode] = useState<"practice" | "exam">("practice");

  const fetchData = React.useCallback(async () => {
    try {
      const [profileRes, dashboardRes, subjectsRes, recsRes] = await Promise.all([
        authApi.getProfile(),
        studentApi.getDashboard(),
        studentApi.getSubjects(),
        aiApi.getRecommendations(),
      ]);

      setProfile(profileRes.data);
      setDashboardData({
        ...dashboardRes.data,
        recommendations: recsRes.data,
      } as DashboardData);
      setSubjectStats(subjectsRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  }, []);

  const fetchInitialData = React.useCallback(async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  }, [fetchData]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  const getSubjectIcon = (name: string) => {
    const icons: Record<string, string> = {
      Mathematics: "📐",
      "English Language": "📚",
      Physics: "⚛️",
      Chemistry: "🧪",
      Biology: "🧬",
      Geography: "🌍",
      Government: "🏛️",
      "Civic Education": "⚖️",
      "Financial Accounting": "💰",
    };
    return icons[name] || "📖";
  };

  const getMasteryStyle = (level: string) => {
    const normalized = level.toLowerCase();
    if (normalized === "expert") return styles.masteryExpert;
    if (normalized === "proficient") return styles.masteryProficient;
    if (normalized === "developing") return styles.masteryDeveloping;
    return styles.masteryDefault;
  };

  const getMasteryTextStyle = (level: string) => {
    const normalized = level.toLowerCase();
    if (normalized === "expert" || normalized === "proficient") return { color: AppColors.primary };
    if (normalized === "developing") return { color: AppColors.warning };
    return { color: AppColors.slate400 };
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={AppColors.primary} />
      }
    >
      {/* Header & Motivation */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.badgeContainer}>
            <View style={styles.premiumBadge}>
              <Ionicons name="sparkles" size={12} color={AppColors.primary} />
              <Text style={styles.premiumText}>PREMIUM ACCESS</Text>
            </View>
            <View style={styles.versionBadge}>
              <Text style={styles.versionText}>v2.0.0</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <IconButton 
              icon="code-working" 
              onPress={() => router.push("/dev-showcase")} 
              variant="ghost"
              size="sm"
            />
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="#FFF" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>
            Welcome back, <Text style={styles.highlightText}>{profile?.full_name?.split(" ")[0]}</Text>
          </Text>
          <Text style={styles.progressSummary}>
            Your WAEC preparation is <Text style={styles.whiteText}>74% complete</Text>.
          </Text>

          <View style={styles.dailyGoalContainer}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.min(((dashboardData?.today_attempts || 0) / 20) * 100, 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.dailyGoalText}>{dashboardData?.today_attempts || 0}/20 QUESTIONS TODAY</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.mainStartButton}
          onPress={() => router.push(activeMode === "practice" ? "/practice" : "/questions")}
        >
          <Text style={styles.mainStartButtonText}>
            START {activeMode === "practice" ? "PRACTICE" : "EXAM"} SESSION
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFF" />
          {activeMode === "practice" && dashboardData?.due_reviews && dashboardData.due_reviews > 0 ? (
            <View style={styles.dueBadge}>
              <Text style={styles.dueBadgeText}>{dashboardData.due_reviews}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      {/* Control Bar */}
      <View style={styles.controlBar}>
        <View style={styles.controlSection}>
          <TouchableOpacity 
            style={[styles.controlButton, activeMode === "practice" && styles.controlButtonActive]}
            onPress={() => setActiveMode("practice")}
          >
            <Text style={activeMode === "practice" ? styles.controlButtonText : styles.controlButtonTextSecondary}>
              Practice Mode
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.controlButton, activeMode === "exam" && styles.controlButtonActive]}
            onPress={() => setActiveMode("exam")}
          >
            <Text style={activeMode === "exam" ? styles.controlButtonText : styles.controlButtonTextSecondary}>
              Exam Mode
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.controlSection, { flex: 0 }]}>
          <TouchableOpacity 
            style={styles.profileIndicator}
            onPress={() => router.push("/profile")}
          >
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>STUDENT</Text>
            </View>
            <View style={styles.miniProfile}>
              <Text style={styles.miniProfileInitials}>
                {profile?.full_name?.split(" ").map(n => n[0]).join("") || "ST"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Target Exam Prompt (Conditional) */}
      {!dashboardData?.has_target_exam && (
        <TouchableOpacity style={styles.targetPrompt}>
          <View style={styles.targetPromptIcon}>
            <MaterialIcons name="track-changes" size={24} color="#FFF" />
          </View>
          <View style={styles.targetPromptContent}>
            <Text style={styles.targetPromptTitle}>Set Your Target Exam</Text>
            <Text style={styles.targetPromptSubtitle}>Unlock personalized insights and plans.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FFF" opacity={0.5} />
        </TouchableOpacity>
      )}

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard title="Questions" value={dashboardData?.total_attempts} icon="target" color={AppColors.primary} />
        <StatCard
          title="Accuracy"
          value={`${dashboardData?.overall_accuracy}%`}
          icon="trending-up"
          color={AppColors.primary}
        />
        <StatCard title="Streak" value={`${dashboardData?.streak_days} Days`} icon="flash" color={AppColors.warning} />
        <StatCard
          title="Study Time"
          value={`${dashboardData?.study_time_hours}h`}
          icon="time"
          color="#8B5CF6"
        />
      </View>

      {/* Performance & Readiness Section */}
      <View style={styles.rowSection}>
        {/* Performance Trends */}
        <View style={styles.performanceTrendsCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="stats-chart" size={16} color={AppColors.primary} />
            <Text style={styles.cardTitle}>PERFORMANCE TRENDS</Text>
          </View>
          <View style={styles.trendsGrid}>
            <TrendItem label="DAILY" value={dashboardData?.performance_trends.daily.attempts} accuracy={dashboardData?.performance_trends.daily.accuracy} />
            <TrendItem label="WEEKLY" value={dashboardData?.performance_trends.weekly.attempts} accuracy={dashboardData?.performance_trends.weekly.accuracy} />
            <TrendItem label="MONTHLY" value={dashboardData?.performance_trends.monthly.attempts} accuracy={dashboardData?.performance_trends.monthly.accuracy} />
          </View>
        </View>

        {/* Exam Readiness */}
        <View style={styles.readinessCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-checkmark" size={16} color="#FFF" />
            <Text style={[styles.cardTitle, { color: "#FFF" }]}>EXAM READINESS</Text>
          </View>
          <View style={styles.readinessContent}>
            <Text style={styles.readinessScore}>{dashboardData?.exam_readiness.readiness_score}%</Text>
            <Text style={styles.readinessLevel}>{dashboardData?.exam_readiness.readiness_level.replace("_", " ")}</Text>
            <Text style={styles.readinessCountdown}>{dashboardData?.exam_readiness.days_until_exam} days until WAEC</Text>
          </View>
        </View>
      </View>

      {/* Performance Radar & Class Ranking Segment */}
      <View style={styles.rowSection}>
         {/* Performance Overview (Radar) */}
         <View style={styles.radarCard}>
            <Text style={styles.cardTitle}>PERFORMANCE RADAR</Text>
            {dashboardData?.radar_data ? (
                <RadarChart data={dashboardData.radar_data} />
            ) : (
                <View style={styles.radarPlaceholder}>
                   <MaterialCommunityIcons name="spider-thread" size={60} color={AppColors.slate800} />
                   <Text style={styles.placeholderText}>Subject Mastery Analysis</Text>
                </View>
            )}
         </View>

         {/* Class Ranking */}
         <View style={styles.rankingCard}>
            <Text style={styles.cardTitle}>CLASS RANKING</Text>
            <View style={styles.rankingContent}>
                <View style={styles.rankingBadge}>
                    <Text style={styles.rankingValue}>#{dashboardData?.classmate_comparison.your_rank}</Text>
                </View>
                <Text style={styles.rankingPercentile}>Top {dashboardData?.classmate_comparison.percentile}% of class</Text>
                <Text style={styles.rankingCompare}>Avg: {dashboardData?.classmate_comparison.class_average_accuracy}% | You: {dashboardData?.classmate_comparison.your_accuracy}%</Text>
            </View>
         </View>
      </View>

      {/* AI Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI RECOMMENDATIONS</Text>
        {dashboardData?.recommendations?.map((rec, index) => (
          <TouchableOpacity key={index} style={styles.recommendationCard}>
            <View style={[styles.recIconContainer, { backgroundColor: rec.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)' }]}>
              <Ionicons name="star" size={20} color={rec.priority === 'high' ? AppColors.error : AppColors.primary} />
            </View>
            <View style={styles.recContent}>
              <Text style={styles.recPriority}>{rec.priority.toUpperCase()} PRIORITY</Text>
              <Text style={styles.recTitle}>{rec.title}</Text>
              <Text style={styles.recMessage}>{rec.message}</Text>
              <View style={styles.recAction}>
                <Text style={styles.recActionText}>Take Action</Text>
                <Ionicons name="arrow-forward" size={14} color={AppColors.primary} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Your Subjects */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>YOUR SUBJECTS</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subjectGrid}>
            {subjectStats.map((subject, index) => (
                <View key={index} style={styles.subjectCard}>
                    <View style={styles.subjectCardHeader}>
                        <Text style={styles.subjectEmoji}>{getSubjectIcon(subject.subject_name)}</Text>
                        <View style={[styles.masteryBadge, getMasteryStyle(subject.mastery_level)]}>
                            <Text style={[styles.masteryText, getMasteryTextStyle(subject.mastery_level)]}>{subject.mastery_level.toUpperCase()}</Text>
                        </View>
                    </View>
                    <Text style={styles.subjectName}>{subject.subject_name}</Text>
                    <View style={styles.subjectProgressContainer}>
                        <View style={styles.subjectProgressBg}>
                            <View style={[styles.subjectProgressFill, { width: `${subject.accuracy}%` }]} />
                        </View>
                        <Text style={styles.subjectAccuracyText}>{subject.accuracy}%</Text>
                    </View>
                    <Text style={styles.topicsLabel}>TOP TOPICS</Text>
                    <View style={styles.topicsContainer}>
                        {subject.top_topics.map((topic, tIdx) => (
                            <View key={tIdx} style={styles.topicBadge}>
                                <Text style={styles.topicText}>{topic}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </View>
      </View>

      {/* Study Analytics Segment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>STUDY ANALYTICS</Text>
        <View style={styles.analyticsGrid}>
            <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Total Study Time</Text>
                <Text style={styles.analyticsValue}>{Math.round((dashboardData?.time_analytics.total_study_time_minutes || 0) / 60 * 10) / 10}h</Text>
            </View>
            <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Avg Time/Question</Text>
                <Text style={styles.analyticsValue}>{dashboardData?.time_analytics.average_time_per_question_seconds}s</Text>
            </View>
        </View>
        <View style={styles.guessingCard}>
            <Text style={styles.guessingTitle}>
                <Text style={styles.boldText}>Guessing Pattern: </Text>
                {dashboardData?.time_analytics.patterns.guessing_instances} instances ({dashboardData?.time_analytics.patterns.guessing_rate}%)
            </Text>
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const StatCard = ({ title, value, icon, color }: any) => (
  <View style={styles.statCard}>
    <View style={[styles.statIconContainer, { backgroundColor: color + "15" }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <View>
      <Text style={[styles.statLabel, { color: AppColors.slate500 }]}>{title.toUpperCase()}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  </View>
);

const TrendItem = ({ label, value, accuracy }: any) => (
  <View style={styles.trendItem}>
    <Text style={styles.trendLabel}>{label}</Text>
    <Text style={styles.trendValue}>{value}</Text>
    <Text style={styles.trendAccuracy}>{accuracy}%</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 8,
  },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.2)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  premiumText: {
    fontSize: 9,
    fontWeight: "900",
    color: AppColors.primary,
    letterSpacing: 1,
  },
  versionBadge: {
    backgroundColor: AppColors.slate900,
    borderWidth: 1,
    borderColor: AppColors.slate800,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  versionText: {
    fontSize: 9,
    fontWeight: "900",
    color: AppColors.slate500,
    letterSpacing: 1,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: AppColors.slate900,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.slate800,
  },
  notificationBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColors.primary,
    borderWidth: 2,
    borderColor: AppColors.slate900,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontFamily: "MontserratBold",
    color: "#FFF",
    letterSpacing: -1,
    marginBottom: 4,
  },
  highlightText: {
    color: AppColors.primary,
  },
  progressSummary: {
    fontSize: 16,
    color: AppColors.slate400,
    marginBottom: 16,
    fontWeight: "500",
  },
  whiteText: {
    color: "#FFF",
    fontWeight: "700",
  },
  dailyGoalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: AppColors.slate900,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: AppColors.primary,
  },
  dailyGoalText: {
    fontSize: 9,
    fontWeight: "900",
    color: AppColors.slate600,
    letterSpacing: 1,
  },
  mainStartButton: {
    height: 60,
    backgroundColor: AppColors.primary,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  mainStartButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 2,
  },
  dueBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: AppColors.background,
  },
  dueBadgeText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "900",
  },
  controlBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  controlSection: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: AppColors.slate950,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 12,
  },
  controlButtonActive: {
    backgroundColor: AppColors.primary,
  },
  controlButtonText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFF",
  },
  controlButtonTextSecondary: {
    fontSize: 11,
    fontWeight: "700",
    color: AppColors.slate500,
  },
  profileIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.slate950,
    borderRadius: 16,
    padding: 4,
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  roleBadge: {
    marginRight: 8,
  },
  roleText: {
    fontSize: 9,
    fontWeight: "900",
    color: AppColors.primary,
    letterSpacing: 1,
  },
  miniProfile: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: AppColors.slate900,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.slate800,
  },
  miniProfileInitials: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFF",
  },
  targetPrompt: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    backgroundColor: AppColors.primary,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  targetPromptIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  targetPromptContent: {
    flex: 1,
  },
  targetPromptTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFF",
  },
  targetPromptSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    width: "48.5%",
    backgroundColor: AppColors.slate950,
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFF",
  },
  statLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
  rowSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  performanceTrendsCard: {
    flex: 1.2,
    backgroundColor: AppColors.slate950,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  readinessCard: {
    flex: 1,
    backgroundColor: AppColors.secondary,
    borderRadius: 24,
    padding: 16,
    shadowColor: AppColors.secondary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 9,
    fontWeight: "900",
    color: AppColors.slate500,
    letterSpacing: 1,
  },
  trendsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trendItem: {
    alignItems: "center",
  },
  trendLabel: {
    fontSize: 8,
    fontWeight: "900",
    color: AppColors.slate600,
    marginBottom: 4,
  },
  trendValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFF",
  },
  trendAccuracy: {
    fontSize: 10,
    fontWeight: "700",
    color: AppColors.primary,
  },
  readinessContent: {
    alignItems: "center",
  },
  readinessScore: {
    fontSize: 36,
    fontFamily: "MontserratBold",
    color: "#FFF",
    lineHeight: 40,
  },
  readinessLevel: {
    fontSize: 10,
    fontWeight: "900",
    color: AppColors.primary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  readinessCountdown: {
    fontSize: 9,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "600",
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "900",
    color: AppColors.slate500,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 10,
    fontWeight: "900",
    color: AppColors.primary,
    letterSpacing: 1,
  },
  recommendationCard: {
    flexDirection: "row",
    backgroundColor: AppColors.slate950,
    borderRadius: 24,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: AppColors.slate900,
    marginBottom: 12,
  },
  recIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  recContent: {
    flex: 1,
  },
  recPriority: {
    fontSize: 8,
    fontWeight: "900",
    color: AppColors.slate600,
    letterSpacing: 1,
    marginBottom: 4,
  },
  recTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFF",
    marginBottom: 6,
  },
  recMessage: {
    fontSize: 13,
    color: AppColors.slate400,
    lineHeight: 18,
    marginBottom: 12,
  },
  recAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  recActionText: {
    fontSize: 11,
    fontWeight: "900",
    color: AppColors.primary,
    letterSpacing: 1,
  },
  radarCard: {
     flex: 1.2,
     backgroundColor: AppColors.slate950,
     borderRadius: 24,
     padding: 16,
     borderWidth: 1,
     borderColor: AppColors.slate900,
  },
  radarPlaceholder: {
     height: 160,
     justifyContent: "center",
     alignItems: "center",
  },
  placeholderText: {
     fontSize: 9,
     color: AppColors.slate600,
     fontWeight: "800",
     marginTop: 8,
     textAlign: "center",
  },
  rankingCard: {
      flex: 1,
      backgroundColor: AppColors.slate950,
      borderRadius: 24,
      padding: 16,
      borderWidth: 1,
      borderColor: AppColors.slate900,
  },
  rankingContent: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
  },
  rankingBadge: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
  },
  rankingValue: {
      fontSize: 18,
      fontWeight: "900",
      color: AppColors.primary,
  },
  rankingPercentile: {
      fontSize: 11,
      fontWeight: "900",
      color: "#FFF",
      marginBottom: 4,
  },
  rankingCompare: {
      fontSize: 8,
      color: AppColors.slate500,
      fontWeight: "600",
  },
  subjectGrid: {
      gap: 12,
  },
  subjectCard: {
      backgroundColor: AppColors.slate950,
      borderRadius: 24,
      padding: 20,
      borderWidth: 1,
      borderColor: AppColors.slate900,
  },
  subjectCardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
  },
  subjectEmoji: {
      fontSize: 32,
  },
  masteryBadge: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  masteryText: {
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 1,
  },
  masteryExpert: { borderColor: "rgba(16, 185, 129, 0.3)" },
  masteryProficient: { borderColor: "rgba(16, 185, 129, 0.3)" },
  masteryDeveloping: { borderColor: "rgba(251, 191, 36, 0.3)" },
  masteryDefault: { borderColor: "rgba(148, 163, 184, 0.2)" },
  subjectName: {
      fontSize: 18,
      fontWeight: "900",
      color: "#FFF",
      marginBottom: 12,
  },
  subjectProgressContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 16,
  },
  subjectProgressBg: {
      flex: 1,
      height: 4,
      backgroundColor: AppColors.slate900,
      borderRadius: 2,
      overflow: "hidden",
  },
  subjectProgressFill: {
      height: "100%",
      backgroundColor: AppColors.primary,
  },
  subjectAccuracyText: {
      fontSize: 12,
      fontWeight: "900",
      color: "#FFF",
  },
  topicsLabel: {
      fontSize: 8,
      fontWeight: "900",
      color: AppColors.slate600,
      letterSpacing: 1.5,
      marginBottom: 8,
  },
  topicsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
  },
  topicBadge: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      backgroundColor: AppColors.slate900,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: AppColors.slate800,
  },
  topicText: {
      fontSize: 10,
      fontWeight: "700",
      color: AppColors.slate400,
  },
  analyticsGrid: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 12,
  },
  analyticsItem: {
      flex: 1,
      backgroundColor: AppColors.slate950,
      borderRadius: 20,
      padding: 16,
      borderWidth: 1,
      borderColor: AppColors.slate900,
      alignItems: "center",
  },
  analyticsLabel: {
      fontSize: 8,
      fontWeight: "900",
      color: AppColors.slate600,
      letterSpacing: 1,
      marginBottom: 4,
  },
  analyticsValue: {
      fontSize: 20,
      fontWeight: "900",
      color: "#FFF",
  },
  guessingCard: {
      backgroundColor: "rgba(251, 191, 36, 0.05)",
      borderRadius: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: "rgba(251, 191, 36, 0.1)",
  },
  guessingTitle: {
      fontSize: 11,
      color: AppColors.warning,
      fontWeight: "500",
  },
  boldText: {
      fontWeight: "900",
  },
});

export default HomeScreen;
