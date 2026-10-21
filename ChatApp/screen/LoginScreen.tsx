import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoginScreenProps } from '../types';
import { useApp } from '../context/AppContext';
import { Spacing, FontSize, BorderRadius } from '../theme';

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { login, theme } = useApp();

  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('123456');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  const handleLogin = () => {
    // Reset thông báo lỗi
    setUsernameError('');
    setPasswordError('');
    setAuthError('');

    let hasError = false;

    if (!username.trim()) {
      setUsernameError('Vui lòng nhập tài khoản');
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('Vui lòng nhập mật khẩu');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Xác thực tài khoản (admin / 123456)
    const success = login(username, password);
    if (success) {
      navigation.replace('Main');
    } else {
      setAuthError('Sai tài khoản hoặc mật khẩu');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          {/* Header & Logo */}
          <View style={styles.header}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: theme.primaryLight },
              ]}
            >
              <Icon name="chatbubbles" size={56} color={theme.primary} />
            </View>
            <Text style={[styles.appName, { color: theme.primary }]}>ChatApp</Text>
            <Text style={[styles.appSubtitle, { color: theme.textSecondary }]}>
              Kết nối nhanh chóng - Trò chuyện thả ga
            </Text>
          </View>

          {/* Form đăng nhập */}
          <View style={[styles.formCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            {authError ? (
              <View style={[styles.errorBanner, { backgroundColor: '#FFEBEE' }]}>
                <Icon name="alert-circle" size={18} color={theme.danger} />
                <Text style={[styles.errorBannerText, { color: theme.danger }]}>
                  {authError}
                </Text>
              </View>
            ) : null}

            {/* Ô nhập Tài khoản */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Tài khoản</Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: usernameError ? theme.danger : theme.border,
                  },
                ]}
              >
                <Icon
                  name="person-outline"
                  size={20}
                  color={theme.textMuted}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="Nhập tài khoản (admin)"
                  placeholderTextColor={theme.textMuted}
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    if (usernameError) setUsernameError('');
                    if (authError) setAuthError('');
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {usernameError ? (
                <Text style={[styles.fieldError, { color: theme.danger }]}>
                  {usernameError}
                </Text>
              ) : null}
            </View>

            {/* Ô nhập Mật khẩu */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Mật khẩu</Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: passwordError ? theme.danger : theme.border,
                  },
                ]}
              >
                <Icon
                  name="lock-closed-outline"
                  size={20}
                  color={theme.textMuted}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="Nhập mật khẩu (123456)"
                  placeholderTextColor={theme.textMuted}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) setPasswordError('');
                    if (authError) setAuthError('');
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={styles.eyeButton}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={theme.textMuted}
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={[styles.fieldError, { color: theme.danger }]}>
                  {passwordError}
                </Text>
              ) : null}
            </View>

            {/* Nút Đăng nhập */}
            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: theme.primary }]}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={[styles.loginButtonText, { color: theme.white }]}>
                Đăng nhập
              </Text>
            </TouchableOpacity>

            {/* Gợi ý tài khoản mẫu */}
            <View style={styles.hintBox}>
              <Text style={[styles.hintText, { color: theme.textMuted }]}>
                Tài khoản thử nghiệm: <Text style={{ fontWeight: '700' }}>admin</Text> / <Text style={{ fontWeight: '700' }}>123456</Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  iconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  appName: {
    fontSize: FontSize.title,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  appSubtitle: {
    fontSize: FontSize.sm,
    marginTop: 4,
  },
  formCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  errorBannerText: {
    marginLeft: Spacing.sm,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    height: '100%',
    paddingVertical: 0,
  },
  eyeButton: {
    padding: Spacing.xs,
  },
  fieldError: {
    fontSize: FontSize.xs,
    marginTop: 4,
    marginLeft: 4,
  },
  loginButton: {
    height: 50,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  loginButtonText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  hintBox: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  hintText: {
    fontSize: FontSize.xs,
  },
});
