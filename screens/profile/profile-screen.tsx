import { AppColors, SmartImage, ToggleSwitch } from "@/components/ui";
import { authApi } from "@/lib/api";
import { ProfileData } from "@/types/profile";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<ProfileData>>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await authApi.getProfile();
      setProfile(response.data);
      setEditedProfile(response.data);
    } catch (_error) {
      Alert.alert("Error", "Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await authApi.updateProfile(editedProfile);
      setProfile(response.data);
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (_error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      setEditedProfile(profile || {});
    }
    setIsEditing(!isEditing);
  };

  const updateField = (field: keyof ProfileData, value: any) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updateNotificationSetting = (field: keyof ProfileData["notification_settings"], value: boolean) => {
    setEditedProfile((prev) => ({
      ...prev,
      notification_settings: {
        ...prev.notification_settings!,
        [field]: value,
      },
    }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color={AppColors.primary} />
          <View style={styles.loaderIcon}>
            <Ionicons name="person" size={24} color={AppColors.primary} />
          </View>
        </View>
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }

  if (!profile) return null;

  const daysUntilExam = () => {
    const target = new Date(profile.target_exam_date);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.headerBackground} />
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <SmartImage
              uri={profile.avatar_url}
              style={styles.avatar}
              placeholder="https://api.dicebear.com/7.x/avataaars/svg?seed=default"
            />
            {isEditing && (
              <TouchableOpacity style={styles.cameraOverlay}>
                <Ionicons name="camera" size={20} color="#FFF" />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.nameContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.fullName}>{profile.full_name}</Text>
              {profile.is_verified && (
                <MaterialCommunityIcons name="check-decagram" size={20} color={AppColors.primary} style={styles.verifiedIcon} />
              )}
            </View>
            <Text style={styles.email}>{profile.email}</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Level {profile.level}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.editButton, isEditing && styles.saveButton]} 
            onPress={isEditing ? handleSave : toggleEdit}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <>
                <Ionicons name={isEditing ? "checkmark" : "create-outline"} size={18} color="#FFF" />
                <Text style={styles.editButtonText}>{isEditing ? "Save" : "Edit Profile"}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatItem icon="star" color="#F59E0B" label="Points" value={profile.total_points.toString()} />
        <StatItem icon="flame" color="#EF4444" label="Streak" value={`${profile.study_streak}d`} />
        <StatItem icon="pie-chart" color={AppColors.primary} label="Progress" value={`${profile.profile_completion_percentage}%`} />
        <StatItem icon="trophy" color="#8B5CF6" label="Badges" value={profile.achievement_badges.length.toString()} />
      </View>

      {/* Main Content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.card}>
          <ProfileInput
            label="Full Name"
            value={isEditing ? editedProfile.full_name : profile.full_name}
            editable={isEditing}
            onChangeText={(val: string) => updateField("full_name", val)}
            icon="person-outline"
          />
          <ProfileInput
            label="Phone Number"
            value={isEditing ? editedProfile.phone_number : profile.phone_number}
            editable={isEditing}
            onChangeText={(val: string) => updateField("phone_number", val)}
            icon="call-outline"
          />
          <ProfileInput
            label="Bio"
            value={isEditing ? editedProfile.bio : profile.bio}
            editable={isEditing}
            onChangeText={(val: string) => updateField("bio", val)}
            icon="information-circle-outline"
            multiline
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education Settings</Text>
        <View style={styles.card}>
          <ProfileInput
            label="Education Level"
            value={isEditing ? editedProfile.education_level : profile.education_level}
            editable={isEditing}
            onChangeText={(val: string) => updateField("education_level", val)}
            icon="school-outline"
          />
          <ProfileInput
            label="Learning Style"
            value={isEditing ? editedProfile.learning_style : profile.learning_style}
            editable={isEditing}
            onChangeText={(val: string) => updateField("learning_style", val)}
            icon="bulb-outline"
          />
        </View>
      </View>

      {/* Sidebar Elements (Mobile Single Column) */}
      <View style={styles.section}>
        <View style={styles.quotaCard}>
          <View style={styles.quotaHeader}>
            <Text style={styles.quotaTitle}>AI Quota Indicator</Text>
            <MaterialCommunityIcons name="robot" size={20} color={AppColors.primary} />
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '75%' }]} />
          </View>
          <Text style={styles.quotaText}>38 / 50 requests used this month</Text>
        </View>

        <View style={styles.countdownCard}>
          <Text style={styles.countdownLabel}>WASSCE Countdown</Text>
          <Text style={styles.countdownValue}>{daysUntilExam()}</Text>
          <Text style={styles.countdownSubtext}>Days Remaining</Text>
          <View style={styles.glassEffect} />
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <View style={styles.card}>
          <SettingToggle
            label="Email Notifications"
            value={editedProfile.notification_settings?.email_enabled ?? profile.notification_settings.email_enabled}
            onValueChange={(val: boolean) => updateNotificationSetting("email_enabled", val)}
            icon="mail-outline"
          />
          <SettingToggle
            label="Push Notifications"
            value={editedProfile.notification_settings?.push_enabled ?? profile.notification_settings.push_enabled}
            onValueChange={(val: boolean) => updateNotificationSetting("push_enabled", val)}
            icon="notifications-outline"
          />
          <SettingToggle
            label="Exam Countdown Alerts"
            value={editedProfile.notification_settings?.exam_countdown ?? profile.notification_settings.exam_countdown}
            onValueChange={(val: boolean) => updateNotificationSetting("exam_countdown", val)}
            icon="timer-outline"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.joinedText}>Joined {new Date(profile.created_at).toLocaleDateString()}</Text>
      </View>
    </ScrollView>
  );
};

interface StatItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  label: string;
  value: string;
}

const StatItem = ({ icon, color, label, value }: StatItemProps) => (
  <View style={styles.statItem}>
    <View style={[styles.statIconContainer, { backgroundColor: `${color}20` }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

interface ProfileInputProps {
  label: string;
  value: string | undefined;
  editable: boolean;
  onChangeText: (val: string) => void;
  icon: keyof typeof Ionicons.glyphMap;
  multiline?: boolean;
}

const ProfileInput = ({ label, value, editable, onChangeText, icon, multiline }: ProfileInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[
        styles.inputContainer, 
        (editable && isFocused) && styles.inputContainerActive,
        multiline && styles.inputContainerMultiline
      ]}>
        <Ionicons 
          name={icon} 
          size={20} 
          color={editable ? (isFocused ? AppColors.iconActive : AppColors.iconInactive) : AppColors.slate400} 
          style={styles.inputIcon} 
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor={AppColors.placeholder}
          multiline={multiline}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.textInputInner, 
            !editable && styles.textInputDisabled,
            multiline && { height: 80, textAlignVertical: 'top', paddingTop: 0 }
          ]}
        />
      </View>
    </View>
  );
};

interface SettingToggleProps {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  icon: keyof typeof Ionicons.glyphMap;
}

const SettingToggle = ({ label, value, onValueChange, icon }: SettingToggleProps) => (
  <View style={styles.toggleRow}>
    <View style={styles.toggleLabelGroup}>
      <Ionicons name={icon} size={20} color={AppColors.slate400} style={styles.toggleIcon} />
      <Text style={styles.toggleLabel}>{label}</Text>
    </View>
    <ToggleSwitch value={value} onValueChange={onValueChange} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: AppColors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderWrapper: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderIcon: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.slate800,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: AppColors.primary,
  },
  loadingText: {
    marginTop: 16,
    color: AppColors.textSecondary,
    fontFamily: "MontserratMedium",
  },
  headerCard: {
    margin: 16,
    borderRadius: 32,
    backgroundColor: AppColors.slate800,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: AppColors.primary,
    opacity: 0.1,
  },
  headerContent: {
    padding: 24,
    alignItems: "center",
  },
  avatarContainer: {
    marginTop: 8,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: AppColors.slate800,
  },
  cameraOverlay: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: AppColors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: AppColors.slate800,
  },
  nameContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  fullName: {
    fontSize: 22,
    fontFamily: "MontserratBold",
    color: AppColors.textPrimary,
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  email: {
    fontSize: 14,
    fontFamily: "MontserratMedium",
    color: AppColors.textSecondary,
    marginTop: 4,
  },
  levelBadge: {
    backgroundColor: `${AppColors.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: `${AppColors.primary}40`,
  },
  levelText: {
    color: AppColors.primary,
    fontFamily: "MontserratBold",
    fontSize: 12,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.slate700,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: AppColors.primary,
  },
  editButtonText: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statItem: {
    width: (width - 64) / 4,
    alignItems: "center",
    backgroundColor: AppColors.slate800,
    paddingVertical: 12,
    borderRadius: 16,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontFamily: "MontserratBold",
    color: AppColors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: "MontserratMedium",
    color: AppColors.textSecondary,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "MontserratBold",
    color: AppColors.textPrimary,
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: AppColors.slate800,
    borderRadius: 24,
    padding: 16,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: "MontserratSemiBold",
    color: AppColors.textSecondary,
    marginBottom: 6,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.slate900,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AppColors.slate700,
    paddingHorizontal: 12,
  },
  inputContainerActive: {
    borderColor: AppColors.primary,
    borderWidth: 2,
  },
  inputContainerMultiline: {
    alignItems: "flex-start",
    paddingTop: 12,
  },
  inputIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  textInputInner: {
    flex: 1,
    color: AppColors.textPrimary,
    fontFamily: "MontserratMedium",
    fontSize: 14,
    height: 44,
  },
  textInputDisabled: {
    color: AppColors.textSecondary,
  },
  quotaCard: {
    backgroundColor: AppColors.slate800,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  quotaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  quotaTitle: {
    fontSize: 16,
    fontFamily: "MontserratBold",
    color: AppColors.textPrimary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: AppColors.slate900,
    borderRadius: 4,
    marginBottom: 12,
  },
  progressBar: {
    height: "100%",
    backgroundColor: AppColors.primary,
    borderRadius: 4,
  },
  quotaText: {
    fontSize: 12,
    fontFamily: "MontserratMedium",
    color: AppColors.textSecondary,
  },
  countdownCard: {
    backgroundColor: AppColors.primary,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  countdownLabel: {
    fontSize: 14,
    fontFamily: "MontserratBold",
    color: "#FFF",
    opacity: 0.9,
    marginBottom: 8,
  },
  countdownValue: {
    fontSize: 48,
    fontFamily: "MontserratBold",
    color: "#FFF",
  },
  countdownSubtext: {
    fontSize: 12,
    fontFamily: "MontserratMedium",
    color: "#FFF",
    opacity: 0.8,
  },
  glassEffect: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#FFF",
    opacity: 0.1,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.slate700,
  },
  toggleLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleIcon: {
    marginRight: 12,
  },
  toggleLabel: {
    fontSize: 14,
    fontFamily: "MontserratMedium",
    color: AppColors.textPrimary,
  },
  footer: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  joinedText: {
    fontSize: 12,
    fontFamily: "MontserratMedium",
    color: AppColors.textSecondary,
  },
});

export default ProfileScreen;
