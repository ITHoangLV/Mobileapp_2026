import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreenProps, Conversation } from '../types';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../component/common/SearchBar';
import { ConversationItem } from '../component/chat/ConversationItem';
import { EmptyState } from '../component/common/EmptyState';
import { Spacing, FontSize } from '../theme';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { conversations, markConversationAsRead, theme, isDarkMode } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lọc cuộc trò chuyện theo tên (realtime, không phân biệt hoa/thường)
  const filteredConversations = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      return conversations;
    }
    return conversations.filter((item) =>
      item.name.toLowerCase().includes(trimmed)
    );
  }, [conversations, searchQuery]);

  // Điều hướng sang ChatScreen và reset badge unread về 0
  const handleOpenChat = (item: Conversation) => {
    markConversationAsRead(item.contactId);
    navigation.navigate('Chat', {
      contactId: item.contactId,
      contactName: item.name,
      contactAvatar: item.avatar,
    });
  };

  const renderItem = ({ item }: { item: Conversation }) => (
    <ConversationItem
      conversation={item}
      onPress={() => handleOpenChat(item)}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header tiêu đề */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.text }]}>Trò chuyện</Text>
      </View>

      {/* Thanh tìm kiếm realtime */}
      <View style={{ backgroundColor: theme.card, paddingBottom: Spacing.sm }}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Tìm kiếm cuộc trò chuyện..."
        />
      </View>

      {/* Danh sách cuộc trò chuyện */}
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={
          filteredConversations.length === 0 ? styles.emptyList : undefined
        }
        ListEmptyComponent={
          <EmptyState
            iconName="chatbubbles-outline"
            title="Không tìm thấy kết quả"
            message={`Không có cuộc trò chuyện nào phù hợp với "${searchQuery}"`}
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontSize: FontSize.title,
    fontWeight: '800',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
