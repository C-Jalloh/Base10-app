import { TextInputField } from "@/components/ui";
import { AppColors } from "@/constants/app-colors";
import { adminApi } from "@/lib/api";
import { ProfileData } from "@/types/profile";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const AdminProfileScreen = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'activity'>('profile');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await adminApi.getProfile();
      setProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch admin profile:", error);
      Alert.alert("Error", "Failed to fetch admin profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      await adminApi.updateProfile(profile);
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const toggleSetting = async (key: string, value: boolean) => {
    if (!profile) return;
    const updatedSettings = {
      notification_settings: {
        ...profile.notification_settings,
        [key]: value
      }
    };
    try {
      const response = await adminApi.updateSettings(updatedSettings);
      setProfile(response.data);
    } catch (error) {
      console.error("Failed to update settings:", error);
      Alert.alert("Error", "Failed to update settings");
    }
  };

  if (loading && !profile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section with Cover */}
      <View style={styles.headerContainer}>
        <View style={styles.coverImage} />
        <View style={styles.headerContent}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarContainer}>
              {profile?.avatar_url ? (
                <Image
                  source={{ uri: profile.avatar_url }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarPlaceholderText}>
                    {profile?.full_name?.[0] || 'A'}
                  </Text>
                </View>
              )}
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.headerInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{profile?.full_name}</Text>
              <View style={styles.adminBadge}>
                <Ionicons name="shield-checkmark" size={12} color={AppColors.primary} />
                <Text style={styles.adminBadgeText}>SYSTEM ADMIN</Text>
              </View>
            </View>
            
            <View style={styles.contactInfo}>
              <View style={styles.infoItem}>
                <Ionicons name="mail-outline" size={14} color={AppColors.slate400} />
                <Text style={styles.infoText}>{profile?.email}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={14} color={AppColors.slate400} />
                <Text style={styles.infoText}>
                  Last login: {profile?.last_login ? new Date(profile.last_login).toLocaleDateString() : 'Never'}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.editProfileButton, isEditing && styles.saveProfileButton]}
            onPress={() => isEditing ? handleUpdateProfile() : setIsEditing(true)}
          >
            <Ionicons 
              name={isEditing ? "save-outline" : "create-outline"} 
              size={18} 
              color={isEditing ? "#FFF" : AppColors.background} 
            />
            <Text style={[styles.editProfileButtonText, isEditing && styles.saveProfileButtonText]}>
              {isEditing ? 'SAVE' : 'EDIT PROFILE'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]} 
          onPress={() => setActiveTab('profile')}
        >
          <Ionicons name="person" size={20} color={activeTab === 'profile' ? AppColors.primary : AppColors.slate400} />
          <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]} 
          onPress={() => setActiveTab('settings')}
        >
          <Ionicons name="settings" size={20} color={activeTab === 'settings' ? AppColors.primary : AppColors.slate400} />
          <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'activity' && styles.activeTab]} 
          onPress={() => setActiveTab('activity')}
        >
          <Ionicons name="analytics" size={20} color={activeTab === 'activity' ? AppColors.primary : AppColors.slate400} />
          <Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>Activity</Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {activeTab === 'profile' && (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons name="person" size={20} color={AppColors.slate400} />
              </View>
              <Text style={styles.sectionTitle}>Administrative Identity</Text>
            </View>

            <View style={styles.infoCard}>
              <TextInputField
                label="FULL NAME"
                value={profile?.full_name}
                editable={isEditing}
                onChangeText={(text) => setProfile(prev => prev ? { ...prev, full_name: text } : null)}
                Icon={Ionicons}
                iconProps={{ name: 'person-outline' }}
              />
              <TextInputField
                label="USERNAME"
                value={profile?.username}
                editable={isEditing}
                onChangeText={(text) => setProfile(prev => prev ? { ...prev, username: text } : null)}
                Icon={Ionicons}
                iconProps={{ name: 'at-outline' }}
              />
              <TextInputField
                label="EMAIL ADDRESS"
                value={profile?.email}
                editable={isEditing}
                onChangeText={(text) => setProfile(prev => prev ? { ...prev, email: text } : null)}
                Icon={Ionicons}
                iconProps={{ name: 'mail-outline' }}
              />
              <TextInputField
                label="PHONE NUMBER"
                value={profile?.phone_number}
                editable={isEditing}
                onChangeText={(text) => setProfile(prev => prev ? { ...prev, phone_number: text } : null)}
                Icon={Ionicons}
                iconProps={{ name: 'call-outline' }}
              />
              <TextInputField
                label="ADMIN BIO"
                value={profile?.bio}
                editable={isEditing}
                multiline
                numberOfLines={4}
                onChangeText={(text) => setProfile(prev => prev ? { ...prev, bio: text } : null)}
                Icon={Ionicons}
                iconProps={{ name: 'information-circle-outline' }}
              />
            </View>

            {/* Audit Summary Card - Styled like the web sidebar */}
            <View style={styles.auditCard}>
              <View style={styles.auditHeader}>
                <Ionicons name="pulse" size={24} color="#FFF" />
                <Text style={styles.auditTitle}>Audit Summary</Text>
              </View>
              
              <View style={styles.auditStats}>
                <View>
                  <Text style={styles.auditValue}>{profile?.total_actions_performed || 0}</Text>
                  <Text style={styles.auditLabel}>TOTAL ACTIONS PERFORMED</Text>
                </View>
                
                <View style={styles.auditDivider} />
                
                <View>
                  <Text style={styles.auditSubLabel}>LAST ACTION</Text>
                  <Text style={styles.auditDate}>
                    {profile?.last_action_at ? new Date(profile.last_action_at).toLocaleString() : 'No recent activity'}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.auditButton} onPress={() => setActiveTab('activity')}>
                <Text style={styles.auditButtonText}>VIEW FULL AUDIT LOG</Text>
                <Ionicons name="chevron-forward" size={16} color={AppColors.background} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'settings' && (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconContainer, { backgroundColor: AppColors.primary + '10' }]}>
                <Ionicons name="notifications" size={20} color={AppColors.primary} />
              </View>
              <Text style={styles.sectionTitle}>System Alerts</Text>
            </View>

            <View style={styles.settingsCard}>
              <SettingRow 
                label="Critical System Issues" 
                icon="alert-circle-outline"
                value={profile?.notification_settings.system_alerts || false} 
                onToggle={(val) => toggleSetting('system_alerts', val)}
              />
              <SettingRow 
                label="Content Moderation Reports" 
                icon="shield-outline"
                value={profile?.notification_settings.user_reports || false} 
                onToggle={(val) => toggleSetting('user_reports', val)}
              />
              <SettingRow 
                label="Security & Login Alerts" 
                icon="lock-closed-outline"
                value={profile?.notification_settings.security_alerts || false} 
                onToggle={(val) => toggleSetting('security_alerts', val)}
              />
              <SettingRow 
                label="Global Email Notifications" 
                icon="mail-outline"
                value={profile?.notification_settings.email_enabled || false} 
                onToggle={(val) => toggleSetting('email_enabled', val)}
              />
            </View>

            <View style={[styles.sectionHeader, { marginTop: 24 }]}>
              <View style={styles.sectionIconContainer}>
                <Ionicons name="settings" size={20} color={AppColors.slate400} />
              </View>
              <Text style={styles.sectionTitle}>Preferences</Text>
            </View>

            <View style={styles.settingsCard}>
              <View style={styles.preferenceRow}>
                <View style={styles.preferenceInfo}>
                  <Ionicons name="color-palette-outline" size={18} color={AppColors.slate400} />
                  <Text style={styles.preferenceLabel}>Interface Theme</Text>
                </View>
                <View style={styles.themeToggle}>
                  <TouchableOpacity 
                    style={[styles.themeButton, profile?.preferences?.theme === 'light' && styles.activeThemeButton]}
                    onPress={() => adminApi.updateSettings({ preferences: { ...profile?.preferences, theme: 'light' } }).then(res => setProfile(res.data))}
                  >
                    <Ionicons name="sunny" size={16} color={profile?.preferences?.theme === 'light' ? AppColors.primary : AppColors.slate400} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.themeButton, profile?.preferences?.theme === 'dark' && styles.activeThemeButton]}
                    onPress={() => adminApi.updateSettings({ preferences: { ...profile?.preferences, theme: 'dark' } }).then(res => setProfile(res.data))}
                  >
                    <Ionicons name="moon" size={16} color={profile?.preferences?.theme === 'dark' ? AppColors.primary : AppColors.slate400} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.preferenceRow}>
                <View style={styles.preferenceInfo}>
                  <Ionicons name="eye-outline" size={18} color={AppColors.slate400} />
                  <Text style={styles.preferenceLabel}>Default View</Text>
                </View>
                <Text style={styles.preferenceValue}>{profile?.preferences?.default_view || 'Dashboard'}</Text>
              </View>

              <View style={styles.preferenceRow}>
                <View style={styles.preferenceInfo}>
                  <Ionicons name="refresh-outline" size={18} color={AppColors.slate400} />
                  <Text style={styles.preferenceLabel}>Auto-Refresh (sec)</Text>
                </View>
                <Text style={styles.preferenceValue}>{profile?.preferences?.auto_refresh_interval || 30}</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'activity' && (
          <View style={styles.activityContainer}>
            <View style={styles.emptyStateIcon}>
              <Ionicons name="construct-outline" size={48} color={AppColors.slate800} />
            </View>
            <Text style={styles.emptyTitle}>Activity Logs</Text>
            <Text style={styles.emptySubtitle}>The full audit log is currently being synchronized with the system.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const SettingRow = ({ label, icon, value, onToggle }: { label: string, icon: any, value: boolean, onToggle: (val: boolean) => void }) => (
  <TouchableOpacity style={styles.settingRow} onPress={() => onToggle(!value)} activeOpacity={0.7}>
    <View style={styles.settingInfo}>
      <Ionicons name={icon} size={18} color={value ? AppColors.primary : AppColors.slate400} />
      <Text style={[styles.settingLabel, value && styles.activeSettingLabel]}>{label}</Text>
    </View>
    <View style={[styles.customSwitch, value && styles.customSwitchActive]}>
      <View style={[styles.switchThumb, value && styles.switchThumbActive]} />
    </View>
  </TouchableOpacity>
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
  headerContainer: {
    backgroundColor: AppColors.slate950,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  coverImage: {
    height: 120,
    backgroundColor: AppColors.slate900,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    marginTop: -50,
    alignItems: 'center',
  },
  avatarWrapper: {
    padding: 4,
    backgroundColor: AppColors.slate950,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 28,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 28,
    backgroundColor: AppColors.slate900,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 40,
    fontWeight: '900',
    color: AppColors.slate600,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: AppColors.primary,
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: AppColors.slate950,
  },
  headerInfo: {
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    fontFamily: 'Outfit-Bold',
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.primary + '30',
    gap: 4,
  },
  adminBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: AppColors.primary,
    letterSpacing: 1,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    color: AppColors.slate400,
    fontWeight: '600',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  saveProfileButton: {
    backgroundColor: AppColors.primary,
  },
  editProfileButtonText: {
    fontSize: 12,
    fontWeight: '900',
    color: AppColors.background,
    letterSpacing: 1,
  },
  saveProfileButtonText: {
    color: '#FFF',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.slate950,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  activeTab: {
    borderColor: AppColors.primary + '40',
    backgroundColor: AppColors.primary + '05',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: AppColors.slate400,
  },
  activeTabText: {
    color: AppColors.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  tabContent: {
    gap: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  sectionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: AppColors.slate900,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: -0.5,
  },
  infoCard: {
    backgroundColor: AppColors.slate950,
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: AppColors.slate900,
    gap: 16,
  },
  auditCard: {
    backgroundColor: AppColors.slate900,
    borderRadius: 32,
    padding: 24,
    marginTop: 10,
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  auditHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  auditTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFF',
  },
  auditStats: {
    gap: 20,
    marginBottom: 24,
  },
  auditValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFF',
  },
  auditLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: AppColors.slate400,
    letterSpacing: 1,
  },
  auditDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  auditSubLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  auditDate: {
    fontSize: 12,
    color: AppColors.slate400,
  },
  auditButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: 54,
    borderRadius: 16,
    gap: 8,
  },
  auditButtonText: {
    fontSize: 12,
    fontWeight: '900',
    color: AppColors.background,
    letterSpacing: 1,
  },
  settingsCard: {
    backgroundColor: AppColors.slate950,
    borderRadius: 32,
    padding: 12,
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 20,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.slate400,
  },
  activeSettingLabel: {
    color: '#FFF',
    fontWeight: '700',
  },
  customSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: AppColors.slate800,
    padding: 4,
  },
  customSwitchActive: {
    backgroundColor: AppColors.primary,
  },
  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  switchThumbActive: {
    transform: [{ translateX: 20 }],
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  preferenceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  preferenceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.slate400,
  },
  preferenceValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  themeToggle: {
    flexDirection: 'row',
    backgroundColor: AppColors.slate900,
    padding: 4,
    borderRadius: 12,
    gap: 4,
  },
  themeButton: {
    padding: 8,
    borderRadius: 8,
  },
  activeThemeButton: {
    backgroundColor: AppColors.slate950,
  },
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 20,
  },
  emptyStateIcon: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: AppColors.slate950,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.slate900,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFF',
  },
  emptySubtitle: {
    fontSize: 14,
    color: AppColors.slate400,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});

export default AdminProfileScreen;
