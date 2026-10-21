import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { ChatScreenProps, Message } from '../types';
import { useApp } from '../context/AppContext';
import { Avatar } from '../component/common/Avatar';
import { MessageBubble } from '../component/chat/MessageBubble';
import { Spacing, FontSize, BorderRadius } from '../theme';

export const ChatScreen: React.FC<ChatScreenProps> = ({ route, navigation }) => {
  const { contactId, contactName, contactAvatar } = route.params;
  const { messages, sendMessage, theme } = useApp();

  const [inputText, setInputText] = useState<string>('');
  const flatListRef = useRef<FlatList<Message>>(null);

  // Lấy danh sách tin nhắn hiện tại của cuộc trò chuyện này
  const conversationMessages = messages[contactId] || [];

  // Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (conversationMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [conversationMessages.length]);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      return;
    }
    sendMessage(contactId, trimmed);
    setInputText('');
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.senderId === 'me';
    return <MessageBubble message={item} isMe={isMe} />;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header tùy chỉnh: Nút back + Avatar + Tên người nhận */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>

        <Avatar uri={contactAvatar} size={40} style={styles.headerAvatar} />

        <View style={styles.headerInfo}>
          <Text
            style={[styles.headerName, { color: theme.text }]}
            numberOfLines={1}
          >
            {contactName}
          </Text>
          <Text style={[styles.headerStatus, { color: theme.online }]}>
            Đang hoạt động
          </Text>
        </View>

        <TouchableOpacity
          style={styles.headerRightAction}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="call-outline" size={22} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* Khu vực tin nhắn và nhập liệu với KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={styles.chatArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        {/* Danh sách tin nhắn */}
        <FlatList
          ref={flatListRef}
          data={conversationMessages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: false });
          }}
          ListEmptyComponent={
            <View style={styles.emptyChat}>
              <Icon
                name="chatbubble-ellipses-outline"
                size={48}
                color={theme.textMuted}
              />
              <Text style={[styles.emptyChatText, { color: theme.textSecondary }]}>
                Chưa có tin nhắn nào. Hãy gửi lời chào đến {contactName}!
              </Text>
            </View>
          }
        />

        {/* Thanh nhập tin nhắn và nút gửi */}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.card,
              borderTopColor: theme.border,
            },
          ]}
        >
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
              },
            ]}
          >
            <TextInput
              style={[styles.textInput, { color: theme.text }]}
              placeholder="Nhập tin nhắn..."
              placeholderTextColor={theme.textMuted}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor:
                  inputText.trim().length > 0 ? theme.primary : theme.border,
              },
            ]}
            onPress={handleSend}
            disabled={inputText.trim().length === 0}
            activeOpacity={0.8}
          >
            <Icon
              name="send"
              size={18}
              color={
                inputText.trim().length > 0
                  ? theme.white
                  : theme.textMuted
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    padding: Spacing.xs,
    marginRight: Spacing.xs,
  },
  headerAvatar: {
    marginRight: Spacing.sm,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  headerStatus: {
    fontSize: FontSize.xs - 1,
  },
  headerRightAction: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  chatArea: {
    flex: 1,
  },
  messageList: {
    paddingVertical: Spacing.md,
    flexGrow: 1,
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxxl,
    marginTop: Spacing.xxxl * 2,
  },
  emptyChatText: {
    fontSize: FontSize.sm,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
    maxHeight: 100,
    minHeight: 40,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: FontSize.md,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
});
