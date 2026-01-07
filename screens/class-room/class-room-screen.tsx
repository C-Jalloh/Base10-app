import { AppColors } from "@/constants/app-colors";
import { classroomApi, studentApi } from "@/lib/api";
import { Classroom, ClassroomStats, ClassroomStreamPost } from "@/types/classroom";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const ClassRoomScreen = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [stats, setStats] = useState<ClassroomStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [stream, setStream] = useState<ClassroomStreamPost[]>([]);
  const [activeTab, setActiveTab] = useState<"stream" | "ai">("stream");
  const [streamLoading, setStreamLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [classroomsRes, statsRes] = await Promise.all([
        classroomApi.getClassrooms(),
        studentApi.getClassroomStats(),
      ]);
      setClassrooms(classroomsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Failed to fetch classroom data:", error);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    init();
  }, [fetchData]);

  const loadStream = useCallback(async (id: string) => {
    setStreamLoading(true);
    try {
      const res = await classroomApi.getStream(id);
      setStream(res.data);
    } catch (error) {
      console.error("Failed to load stream:", error);
    } finally {
      setStreamLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      loadStream(selectedClassId);
    }
  }, [selectedClassId, loadStream]);

  const onRefresh = async () => {
    setRefreshing(true);
    if (selectedClassId) {
      await loadStream(selectedClassId);
    } else {
      await fetchData();
    }
    setRefreshing(false);
  };

  const filteredClassrooms = classrooms.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedClass = classrooms.find((c) => c.id === selectedClassId);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  // PORTAL VIEW (Individual Classroom)
  if (selectedClassId && selectedClass) {
    return (
      <View style={styles.container}>
        {/* Modern Portal Header */}
        <View style={styles.portalHero}>
          <View style={styles.portalUpperHeader}>
            <TouchableOpacity 
              style={styles.portalBackButton}
              onPress={() => setSelectedClassId(null)}
            >
              <Ionicons name="arrow-back" size={22} color="#FFF" />
            </TouchableOpacity>
            <View style={[styles.portalStatusBadge, { backgroundColor: selectedClass.progress === 100 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)' }]}>
               <View style={[styles.statusDot, { backgroundColor: selectedClass.progress === 100 ? AppColors.primary : AppColors.warning }]} />
               <Text style={[styles.statusText, { color: selectedClass.progress === 100 ? AppColors.primary : AppColors.warning }]}>
                 {selectedClass.progress}% COMPLETE
               </Text>
            </View>
            <TouchableOpacity style={styles.portalMoreButton}>
              <Ionicons name="ellipsis-horizontal" size={22} color={AppColors.slate400} />
            </TouchableOpacity>
          </View>

          <View style={styles.portalMainHeader}>
            <View style={styles.subjectIconLarge}>
               <MaterialCommunityIcons 
                 name={selectedClass.subject === 'Mathematics' ? "calculator" : "book-open-variant"} 
                 size={32} 
                 color={AppColors.primary} 
               />
            </View>
            <View style={styles.portalHeaderContent}>
               <Text style={styles.portalHeroTitle}>{selectedClass.name}</Text>
               <View style={styles.teacherRow}>
                 <Ionicons name="person-circle-outline" size={14} color={AppColors.slate500} />
                 <Text style={styles.teacherNameHero}>FACILITATOR: {selectedClass.teacher_name}</Text>
               </View>
            </View>
          </View>

          {/* New Metadata Grid inside Hero */}
          <View style={styles.portalMetaGrid}>
             <View style={styles.metaBox}>
                <Text style={styles.metaBoxLabel}>CLASS CODE</Text>
                <Text style={styles.metaBoxValue}>{selectedClass.class_code || '---'}</Text>
             </View>
             <View style={styles.metaBox}>
                <Text style={styles.metaBoxLabel}>COMMUNITY</Text>
                <Text style={styles.metaBoxValue}>{selectedClass.student_count} STUDENTS</Text>
             </View>
             <View style={styles.metaBox}>
                <Text style={styles.metaBoxLabel}>RESOURCES</Text>
                <Text style={styles.metaBoxValue}>{selectedClass.total_posts || 0} ITEMS</Text>
             </View>
          </View>
        </View>

        {/* Tab Switcher (Modeled after home screen control bar) */}
        <View style={styles.portalControlBar}>
          <View style={styles.portalTabs}>
            <TouchableOpacity 
              style={[styles.portalTab, activeTab === "stream" && styles.portalTabActive]}
              onPress={() => setActiveTab("stream")}
            >
              <Ionicons name="chatbubbles-outline" size={16} color={activeTab === "stream" ? "#FFF" : AppColors.slate500} />
              <Text style={[styles.portalTabText, activeTab === "stream" && styles.portalTabTextActive]}>STREAM</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.portalTab, activeTab === "ai" && styles.portalTabActive]}
              onPress={() => setActiveTab("ai")}
            >
              <Octicons name="sparkle" size={16} color={activeTab === "ai" ? AppColors.primary : AppColors.slate500} />
              <Text style={[styles.portalTabText, activeTab === "ai" && styles.portalTabTextActive]}>AI TEACHER</Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === "stream" ? (
            <FlatList
                data={stream}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={AppColors.primary} />
                }
                ListHeaderComponent={
                    <View style={styles.portalComposer}>
                        <View style={styles.composerAvatar}>
                           <Text style={styles.avatarInitials}>JD</Text>
                        </View>
                        <TextInput 
                          style={styles.composerInputCompact}
                          placeholder="Announce something to your class..."
                          placeholderTextColor={AppColors.slate600}
                          multiline
                        />
                        <TouchableOpacity style={styles.composerAttach}>
                           <Ionicons name="add-circle-outline" size={24} color={AppColors.primary} />
                        </TouchableOpacity>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.portalPostCard}>
                        <View style={styles.postCardHeader}>
                            <View style={[styles.postCategoryIcon, { backgroundColor: item.type === 'announcement' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)' }]}>
                               <Ionicons 
                                 name={item.type === 'announcement' ? "megaphone" : "document-text"} 
                                 size={18} 
                                 color={item.type === 'announcement' ? AppColors.error : AppColors.primary} 
                               />
                            </View>
                            <View style={styles.postCardTitleSection}>
                               <Text style={styles.postAuthorName}>{item.author_name}</Text>
                               <View style={styles.postMetaLine}>
                                  <Text style={styles.postRoleBadge}>{item.author_role.toUpperCase()}</Text>
                                  <View style={styles.separatorDot} />
                                  <Text style={styles.postTimestamp}>{new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</Text>
                               </View>
                            </View>
                        </View>

                        <Text style={styles.postBodyContent}>{item.content}</Text>

                        {item.attachments && item.attachments.map((at, idx) => (
                          <TouchableOpacity key={idx} style={styles.streamFileCard}>
                             <View style={styles.fileIconWrapper}>
                                <Ionicons name="document-outline" size={20} color={AppColors.primary} />
                             </View>
                             <View style={styles.fileInfoWrapper}>
                                <Text style={styles.fileNameText} numberOfLines={1}>{at.name}</Text>
                                <Text style={styles.fileSizeText}>PDF DOCUMENT</Text>
                             </View>
                             <Ionicons name="download-outline" size={20} color={AppColors.slate600} />
                          </TouchableOpacity>
                        ))}

                        <View style={styles.postCardFooter}>
                           <TouchableOpacity style={styles.postActionItem}>
                              <Ionicons name="chatbox-outline" size={18} color={AppColors.slate500} />
                              <Text style={styles.postActionText}>{item.comments_count} COMMENTS</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={styles.postActionItem}>
                              <Ionicons name="share-social-outline" size={18} color={AppColors.slate500} />
                           </TouchableOpacity>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.portalScrollContent}
            />
        ) : (
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.portalAiContainer}
            >
                <ScrollView contentContainerStyle={styles.portalAiFlow}>
                    <View style={styles.aiHero}>
                       <View style={styles.aiGlowIcon}>
                          <Octicons name="sparkle" size={40} color={AppColors.primary} />
                       </View>
                       <Text style={styles.aiHeading}>AI Assistant for {selectedClass.subject}</Text>
                       <Text style={styles.aiDescription}>Ask deep questions about course materials, clarify complex concepts, or request additional practice problems.</Text>
                       
                       <View style={styles.aiSuggestions}>
                          <Text style={styles.suggestionTitle}>QUICK TOPICS</Text>
                          <View style={styles.suggestionGrid}>
                             {['Latest Assignment', 'Exam Strategy', 'Concept Help'].map((tag, i) => (
                               <TouchableOpacity key={i} style={styles.suggestionPill}>
                                  <Text style={styles.suggestionText}>{tag}</Text>
                               </TouchableOpacity>
                             ))}
                          </View>
                       </View>
                    </View>
                </ScrollView>
                <View style={styles.portalAiInputArea}>
                    <TextInput 
                        placeholder="Message AI Teacher..."
                        placeholderTextColor={AppColors.slate600}
                        style={styles.portalAiInput}
                    />
                    <TouchableOpacity style={styles.portalSendButton}>
                        <Ionicons name="send" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )}
      </View>
    );
  }

  // LIST VIEW (Hub)
  const renderHeader = () => (
    <View style={styles.header}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.badgeContainer}>
          <View style={styles.hubBadge}>
            <Ionicons name="school" size={14} color={AppColors.primary} />
            <Text style={styles.hubBadgeText}>ACADEMIC HUB</Text>
          </View>
        </View>
        <Text style={styles.title}>
          Your <Text style={styles.highlightText}>Classrooms</Text>
        </Text>
        <Text style={styles.subtitle}>
          Join your peers and teachers in a collaborative learning environment.
        </Text>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <StatItem label="My Classes" value={stats?.active_classrooms || 0} icon="book-outline" color={AppColors.primary} />
        <StatItem label="Assignments" value={stats?.total_assignments || 0} icon="sparkles-outline" color={AppColors.warning} />
        <StatItem label="Completed" value={stats?.completed_assignments || 0} icon="checkmark-circle-outline" color="#8B5CF6" />
        <StatItem label="Progress" value={`${Math.round(stats?.completion_percentage || 0)}%`} icon="trending-up-outline" color={AppColors.primary} />
      </View>

      {/* Search & Action */}
      <View style={styles.actionRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={AppColors.slate500} style={styles.searchIcon} />
          <TextInput
            placeholder="Search classes..."
            placeholderTextColor={AppColors.slate600}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.joinButton}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderClassroomCard = ({ item }: { item: Classroom }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedClassId(item.id)}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: item.progress === 100 ? AppColors.primary : AppColors.slate900 }]}>
          <Ionicons 
            name={item.progress === 100 ? "checkmark-done" : (item.subject === 'Mathematics' ? "calculator" : "book")} 
            size={24} 
            color={item.progress === 100 ? "#FFF" : AppColors.primary} 
          />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={[styles.cardName, item.progress === 100 && { color: AppColors.primary }]}>{item.name}</Text>
          <View style={styles.tagRow}>
            <View style={[styles.roleTag, { backgroundColor: item.progress === 100 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(148, 163, 184, 0.05)' }]}>
              <Text style={[styles.roleTagText, { color: item.progress === 100 ? AppColors.primary : AppColors.slate500 }]}>
                {item.progress === 100 ? 'JOINED' : item.grade_level || 'SS3'}
              </Text>
            </View>
            <Text style={styles.teacherNameSmall}>{item.teacher_name}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.progressContainer}>
           <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${item.progress || 0}%` }]} />
           </View>
           <Text style={styles.progressText}>{item.progress || 0}%</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.studentCountContainer}>
            <Ionicons name="people-outline" size={16} color={AppColors.slate500} />
            <Text style={styles.studentCount}>{item.student_count} Students</Text>
        </View>
        <View style={styles.enterButton}>
            <Text style={styles.enterText}>ENTER ROOM</Text>
            <Ionicons name="chevron-forward" size={14} color={AppColors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredClassrooms}
        renderItem={renderClassroomCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={AppColors.primary} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="school-outline" size={60} color={AppColors.slate800} />
            <Text style={styles.emptyTitle}>No Classrooms Found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? "Try a different search term." : "Join a class using the code from your teacher."}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const StatItem = ({ label, value, icon, color }: any) => (
  <View style={styles.statItem}>
    <View style={[styles.statIconContainer, { backgroundColor: AppColors.slate950 }]}>
      <Ionicons name={icon} size={18} color={color} />
    </View>
    <View>
      <Text style={styles.statLabel}>{label.toUpperCase()}</Text>
      <Text style={styles.statValue}>{value}</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  heroSection: {
    marginBottom: 24,
  },
  badgeContainer: {
    marginBottom: 12,
  },
  hubBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  hubBadgeText: {
    fontSize: 9,
    fontWeight: "900",
    color: AppColors.primary,
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 32,
    fontFamily: "MontserratBold",
    color: "#FFF",
    letterSpacing: -1,
    marginBottom: 8,
  },
  highlightText: {
    color: AppColors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: AppColors.slate400,
    fontWeight: "500",
    lineHeight: 20,
  },
  statsBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    minWidth: "48%",
    backgroundColor: AppColors.slate950,
    borderRadius: 20,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  statLabel: {
    fontSize: 8,    fontWeight: "800",
    color: AppColors.slate600,
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFF",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    height: 50,
    backgroundColor: AppColors.slate950,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: AppColors.slate900,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
  },
  joinButton: {
    width: 50,
    height: 50,
    backgroundColor: AppColors.primary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  card: {
    backgroundColor: AppColors.slate950,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeaderText: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFF",
    marginBottom: 4,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  roleTag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  roleTagText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  teacherNameSmall: {
    fontSize: 10,
    fontWeight: "700",
    color: AppColors.slate500,
  },
  cardBody: {
    marginBottom: 20,
  },
  progressContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
  },
  progressBg: {
      flex: 1,
      height: 6,
      backgroundColor: AppColors.slate900,
      borderRadius: 100,
      overflow: "hidden",
  },
  progressFill: {
      height: "100%",
      backgroundColor: AppColors.primary,
  },
  progressText: {
      fontSize: 11,
      fontWeight: "900",
      color: "#FFF",
      width: 35,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: AppColors.slate900,
  },
  studentCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  studentCount: {
    fontSize: 11,
    fontWeight: "800",
    color: AppColors.slate500,
  },
  enterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  enterText: {
    fontSize: 10,
    fontWeight: "900",
    color: AppColors.primary,
    letterSpacing: 1,
  },
  emptyContainer: {
    padding: 60,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFF",
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: AppColors.slate500,
    textAlign: "center",
    lineHeight: 20,
  },

  // REVISED PORTAL STYLES (Individual Classroom)
  portalHero: {
    backgroundColor: AppColors.slate950,
    padding: 20,
    paddingTop: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  portalUpperHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  portalBackButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: AppColors.slate900,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.slate800,
  },
  portalStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  portalMoreButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  portalMainHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 24,
  },
  subjectIconLarge: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: AppColors.slate900,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.slate800,
  },
  portalHeaderContent: {
    flex: 1,
  },
  portalHeroTitle: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "900",
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'System',
  },
  teacherRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  teacherNameHero: {
    fontSize: 10,
    fontWeight: "800",
    color: AppColors.slate500,
    letterSpacing: 0.5,
  },
  portalMetaGrid: {
    flexDirection: "row",
    gap: 12,
  },
  metaBox: {
    flex: 1,
    backgroundColor: AppColors.slate900,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AppColors.slate800,
  },
  metaBoxLabel: {
    fontSize: 7,
    fontWeight: "900",
    color: AppColors.slate500,
    letterSpacing: 1,
    marginBottom: 4,
  },
  metaBoxValue: {
    fontSize: 11,
    fontWeight: "900",
    color: "#FFF",
  },

  portalControlBar: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  portalTabs: {
    flexDirection: "row",
    backgroundColor: AppColors.slate950,
    padding: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  portalTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    borderRadius: 100,
  },
  portalTabActive: {
    backgroundColor: AppColors.slate900,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  portalTabText: {
    fontSize: 10,
    fontWeight: "900",
    color: AppColors.slate500,
    letterSpacing: 1,
  },
  portalTabTextActive: {
    color: "#FFF",
  },

  portalScrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  portalComposer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.slate950,
    borderRadius: 20,
    padding: 8,
    paddingLeft: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  composerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: {
    fontSize: 10,
    fontWeight: "900",
    color: "#FFF",
  },
  composerInputCompact: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 13,
    color: "#FFF",
    fontWeight: "600",
    maxHeight: 100,
  },
  composerAttach: {
    padding: 10,
  },

  portalPostCard: {
    backgroundColor: AppColors.slate950,
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  postCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  postCategoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  postCardTitleSection: {
    flex: 1,
  },
  postAuthorName: {
    fontSize: 15,
    fontWeight: "900",
    color: "#FFF",
    marginBottom: 2,
  },
  postMetaLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  postRoleBadge: {
    fontSize: 8,
    fontWeight: "900",
    color: AppColors.primary,
    letterSpacing: 0.5,
  },
  separatorDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: AppColors.slate700,
  },
  postTimestamp: {
    fontSize: 9,
    fontWeight: "800",
    color: AppColors.slate600,
  },
  postBodyContent: {
    fontSize: 14,
    color: AppColors.slate300,
    lineHeight: 22,
    marginBottom: 16,
  },
  streamFileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.slate900,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: AppColors.slate800,
    marginBottom: 16,
    gap: 12,
  },
  fileIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: "center",
    alignItems: "center",
  },
  fileInfoWrapper: {
    flex: 1,
  },
  fileNameText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFF",
    marginBottom: 2,
  },
  fileSizeText: {
    fontSize: 8,
    fontWeight: "900",
    color: AppColors.slate500,
    letterSpacing: 0.5,
  },
  postCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: AppColors.slate900,
  },
  postActionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  postActionText: {
    fontSize: 10,
    fontWeight: "900",
    color: AppColors.slate500,
    letterSpacing: 0.5,
  },

  portalAiContainer: {
    flex: 1,
  },
  portalAiFlow: {
    padding: 24,
    paddingTop: 10,
  },
  aiHero: {
    alignItems: "center",
    paddingVertical: 40,
  },
  aiGlowIcon: {
    width: 80,
    height: 80,
    borderRadius: 30,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  aiHeading: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 12,
  },
  aiDescription: {
    fontSize: 14,
    color: AppColors.slate400,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
    marginBottom: 32,
  },
  aiSuggestions: {
    width: "100%",
  },
  suggestionTitle: {
    fontSize: 9,
    fontWeight: "900",
    color: AppColors.slate500,
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: "center",
  },
  suggestionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  suggestionPill: {
    backgroundColor: AppColors.slate950,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  suggestionText: {
    fontSize: 11,
    fontWeight: "800",
    color: AppColors.slate300,
  },
  portalAiInputArea: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    backgroundColor: AppColors.slate950,
    borderTopWidth: 1,
    borderTopColor: AppColors.slate900,
  },
  portalAiInput: {
    flex: 1,
    height: 52,
    backgroundColor: AppColors.slate900,
    borderRadius: 16,
    paddingHorizontal: 20,
    color: "#FFF",
    fontWeight: "600",
    borderWidth: 1,
    borderColor: AppColors.slate800,
  },
  portalSendButton: {
    width: 52,
    height: 52,
    backgroundColor: AppColors.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default ClassRoomScreen;
