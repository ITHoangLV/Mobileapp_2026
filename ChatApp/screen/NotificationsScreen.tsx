import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NotificationsScreenProps, AppNotification } from '../types';
import { useApp } from '../context/AppContext';
import { NotificationItem } from '../component/notification/NotificationItem';
import { EmptyState } from '../component/common/EmptyState';
import { Spacing, FontSize } from '../theme';

export const NotificationsScreen: React.FC<NotificationsScreenProps> = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    theme,
  } = useApp();

  const [onlyUnread, setOnlyUnread] = useState<boolean>(false);

  // Lọc thông báo theo công tắc switch "Chỉ hiện thông báo chưa đọc"
  const displayedNotifications = useMemo(() => {
    if (onlyUnread) {
      return notifications.filter((n) => !n.isRead);
    }
    return notifications;
  }, [notifications, onlyUnread]);

  const renderItem = ({ item }: { item: AppNotification }) => (
    <NotificationItem
      notification={item}
      onPress={() => markNotificationAsRead(item.id)}
      onMarkRead={() => markNotificationAsRead(item.id)}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header với nút Đọc tất cả */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.text }]}>Thông báo</Text>
        <TouchableOpacity
          onPress={markAllNotificationsAsRead}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.readAllButton, { color: theme.primary }]}>
            Đọc tất cả
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bộ lọc Switch: Chỉ hiện thông báo chưa đọc */}
      <View
        style={[
          styles.filterRow,
          {
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.filterLabel, { color: theme.text }]}>
          Chỉ hiện thông báo chưa đọc
        </Text>
        <Switch
          value={onlyUnread}
          onValueChange={setOnlyUnread}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor={theme.white}
        />
      </View>

      {/* FlatList danh sách thông báo */}
      <FlatList
        data={displayedNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={
          displayedNotifications.length === 0 ? styles.emptyList : undefined
        }
        ListEmptyComponent={
          <EmptyState
            iconName="notifications-off-outline"
            title="Không có thông báo nào"
            message={
              onlyUnread
                ? 'Bạn đã xem hết toàn bộ các thông báo mới.'
                : 'Hộp thư thông báo của bạn hiện đang trống.'
            }
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontSize: FontSize.title,
    fontWeight: '800',
  },
  readAllButton: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  filterLabel: {
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
