import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContactsScreenProps, Contact } from '../types';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../component/common/SearchBar';
import { ContactItem } from '../component/contact/ContactItem';
import { EmptyState } from '../component/common/EmptyState';
import { Spacing, FontSize } from '../theme';

export const ContactsScreen: React.FC<ContactsScreenProps> = ({ navigation }) => {
  const { contacts, getOrCreateConversation, theme } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lọc danh bạ theo tên người dùng
  const filteredContacts = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      return contacts;
    }
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(trimmed)
    );
  }, [contacts, searchQuery]);

  // Nhấn vào người dùng: mở ChatScreen (tạo mới cuộc trò chuyện nếu chưa tồn tại)
  const handleSelectContact = (contact: Contact) => {
    getOrCreateConversation(contact);
    navigation.navigate('Chat', {
      contactId: contact.id,
      contactName: contact.name,
      contactAvatar: contact.avatar,
    });
  };

  const renderItem = ({ item }: { item: Contact }) => (
    <ContactItem
      contact={item}
      onPress={() => handleSelectContact(item)}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.text }]}>Danh bạ</Text>
        <Text style={[styles.countBadge, { color: theme.textSecondary }]}>
          {filteredContacts.length} liên hệ
        </Text>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={{ backgroundColor: theme.card, paddingBottom: Spacing.sm }}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Tìm bạn bè theo tên..."
        />
      </View>

      {/* FlatList danh bạ */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={
          filteredContacts.length === 0 ? styles.emptyList : undefined
        }
        ListEmptyComponent={
          <EmptyState
            iconName="people-outline"
            title="Không tìm thấy liên hệ"
            message={`Không có ai trong danh bạ khớp với "${searchQuery}"`}
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
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontSize: FontSize.title,
    fontWeight: '800',
  },
  countBadge: {
    fontSize: FontSize.sm,
    marginBottom: 4,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
