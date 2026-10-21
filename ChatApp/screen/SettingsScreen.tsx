import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
import { SettingsScreenProps } from '../types';
import { useApp } from '../context/AppContext';
import { Avatar } from '../component/common/Avatar';
import { Spacing, FontSize, BorderRadius } from '../theme';

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const {
    currentUser,
    logout,
    isDarkMode,
    toggleDarkMode,
    notificationsEnabled,
    toggleNotificationsEnabled,
    theme,
  } = useApp();

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            );
          },
        },
      ]
    );
  };

  const userAvatar = currentUser?.avatar || 'https://i.pravatar.cc/150?img=68';
  const userName = currentUser?.name || 'Người dùng';
  const userUsername = currentUser?.username || 'admin';
  const userEmail = currentUser?.email || 'admin@chatapp.com';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Cài đặt</Text>
        </View>

        {/* Thẻ thông tin cá nhân */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Avatar uri={userAvatar} size={76} />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.text }]}>
              {userName}
            </Text>
            <Text style={[styles.profileUsername, { color: theme.textSecondary }]}>
              @{userUsername}
            </Text>
            <Text style={[styles.profileEmail, { color: theme.textMuted }]}>
              {userEmail}
            </Text>
          </View>
        </View>

        {/* Khối Cài đặt chung */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          TÙY CHỈNH HỆ THỐNG
        </Text>

        <View
          style={[
            styles.settingsGroup,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          {/* Chế độ tối */}
          <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
            <View style={styles.settingLabelGroup}>
              <View
                style={[
                  styles.settingIconWrapper,
                  { backgroundColor: isDarkMode ? '#4A148C' : '#EDE7F6' },
                ]}
              >
                <Icon
                  name={isDarkMode ? 'moon' : 'moon-outline'}
                  size={20}
                  color={isDarkMode ? '#D1C4E9' : '#512DA8'}
                />
              </View>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                Chế độ tối
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={theme.white}
            />
          </View>

          {/* Bật thông báo */}
          <View style={styles.settingRow}>
            <View style={styles.settingLabelGroup}>
              <View
                style={[
                  styles.settingIconWrapper,
                  { backgroundColor: '#E8F5E9' },
                ]}
              >
                <Icon
                  name={notificationsEnabled ? 'notifications' : 'notifications-off'}
                  size={20}
                  color="#2E7D32"
                />
              </View>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                Bật thông báo
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotificationsEnabled}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={theme.white}
            />
          </View>
        </View>

        {/* Thông tin ứng dụng */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          THÔNG TIN ỨNG DỤNG
        </Text>

        <View
          style={[
            styles.settingsGroup,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
            <View style={styles.settingLabelGroup}>
              <View style={[styles.settingIconWrapper, { backgroundColor: '#E1F5FE' }]}>
                <Icon name="information-circle-outline" size={20} color="#0288D1" />
              </View>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                Phiên bản
              </Text>
            </View>
            <Text style={[styles.settingValue, { color: theme.textMuted }]}>
              v1.0.0
            </Text>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLabelGroup}>
              <View style={[styles.settingIconWrapper, { backgroundColor: '#FFF3E0' }]}>
                <Icon name="shield-checkmark-outline" size={20} color="#F57C00" />
              </View>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                Chính sách bảo mật
              </Text>
            </View>
            <Icon name="chevron-forward" size={18} color={theme.textMuted} />
          </View>
        </View>

        {/* Nút Đăng xuất */}
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              backgroundColor: theme.card,
              borderColor: theme.danger,
            },
          ]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Icon name="log-out-outline" size={22} color={theme.danger} />
          <Text style={[styles.logoutText, { color: theme.danger }]}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.title,
    fontWeight: '800',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
  },
  profileInfo: {
    marginLeft: Spacing.lg,
    flex: 1,
  },
  profileName: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    marginBottom: 2,
  },
  profileUsername: {
    fontSize: FontSize.sm,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: FontSize.xs,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  settingsGroup: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  settingLabel: {
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: FontSize.sm,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xxl,
    height: 50,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
  },
  logoutText: {
    fontSize: FontSize.md,
    fontWeight: '700',
    marginLeft: Spacing.sm,
  },
});
