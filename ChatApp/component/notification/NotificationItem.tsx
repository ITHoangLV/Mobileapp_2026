import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppNotification } from '../../types';
import { useApp } from '../../context/AppContext';
import { Spacing, FontSize, BorderRadius } from '../../theme';

interface Props {
  notification: AppNotification;
  onPress: () => void;
  onMarkRead: () => void;
}

export const NotificationItem: React.FC<Props> = ({
  notification,
  onPress,
  onMarkRead,
}) => {
  const { theme } = useApp();
  const isUnread = !notification.isRead;

  // Chọn icon tương ứng với loại thông báo
  const getIconName = (): string => {
    switch (notification.type) {
      case 'message':
        return 'chatbubble-ellipses-outline';
      case 'friend_request':
        return 'person-add-outline';
      case 'system':
      default:
        return 'notifications-outline';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isUnread ? theme.primaryLight : theme.card,
          borderBottomColor: theme.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isUnread ? theme.primary : theme.inputBackground,
          },
        ]}
      >
        <Icon
          name={getIconName()}
          size={20}
          color={isUnread ? theme.white : theme.textSecondary}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text
            style={[
              styles.title,
              {
                color: theme.text,
                fontWeight: isUnread ? '700' : '500',
              },
            ]}
            numberOfLines={1}
          >
            {notification.title}
          </Text>
          {isUnread && (
            <View
              style={[
                styles.unreadDot,
                { backgroundColor: theme.primary },
              ]}
            />
          )}
        </View>

        <Text
          style={[
            styles.message,
            {
              color: isUnread ? theme.text : theme.textSecondary,
              fontWeight: isUnread ? '600' : '400',
            },
          ]}
          numberOfLines={2}
        >
          {notification.message}
        </Text>

        <View style={styles.footerRow}>
          <Text style={[styles.timestamp, { color: theme.textMuted }]}>
            {notification.timestamp}
          </Text>
          {isUnread && (
            <TouchableOpacity
              onPress={onMarkRead}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={[styles.markReadText, { color: theme.primary }]}>
                Đánh dấu đã đọc
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: FontSize.md,
    flex: 1,
    marginRight: Spacing.sm,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  message: {
    fontSize: FontSize.sm,
    lineHeight: 18,
    marginBottom: 6,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: FontSize.xs,
  },
  markReadText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
});
