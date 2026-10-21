import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useApp } from '../../context/AppContext';
import { Spacing, FontSize } from '../../theme';

interface Props {
  iconName?: string;
  title?: string;
  message?: string;
}

export const EmptyState: React.FC<Props> = ({
  iconName = 'search-outline',
  title = 'Không tìm thấy kết quả',
  message = 'Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra lại kết nối.',
}) => {
  const { theme } = useApp();

  return (
    <View style={styles.container}>
      <Icon name={iconName} size={64} color={theme.textMuted} style={styles.icon} />
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {message ? (
        <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxxl,
    paddingVertical: Spacing.xxxl * 2,
  },
  icon: {
    marginBottom: Spacing.md,
    opacity: 0.6,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  message: {
    fontSize: FontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
});
