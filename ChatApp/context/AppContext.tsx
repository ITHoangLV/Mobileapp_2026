import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import {
  User,
  Conversation,
  Contact,
  AppNotification,
  Message,
} from '../types';
import {
  mockCurrentUser,
  mockContacts,
  mockConversations,
  mockNotifications,
  mockMessages,
} from '../data/mockData';
import { lightTheme, darkTheme, ThemeColors } from '../theme';

interface AppContextType {
  currentUser: User | null;
  conversations: Conversation[];
  contacts: Contact[];
  notifications: AppNotification[];
  messages: Record<string, Message[]>;
  isDarkMode: boolean;
  notificationsEnabled: boolean;
  theme: ThemeColors;
  unreadNotificationsCount: number;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  toggleDarkMode: () => void;
  toggleNotificationsEnabled: () => void;
  markConversationAsRead: (contactId: string) => void;
  sendMessage: (contactId: string, text: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  getOrCreateConversation: (contact: Contact) => Conversation;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [contacts] = useState<Contact[]>(mockContacts);
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  // Chọn theme sáng / tối
  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  // Đếm thông báo chưa đọc cho badge của tab bar
  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  // Đăng nhập: tài khoản hợp lệ admin / 123456
  const login = (username: string, password: string): boolean => {
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (trimmedUser === 'admin' && trimmedPass === '123456') {
      setCurrentUser(mockCurrentUser);
      return true;
    }
    return false;
  };

  // Đăng xuất: xóa user hiện tại
  const logout = (): void => {
    setCurrentUser(null);
  };

  const toggleDarkMode = (): void => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleNotificationsEnabled = (): void => {
    setNotificationsEnabled((prev) => !prev);
  };

  // Đánh dấu cuộc trò chuyện đã đọc và reset unread về 0
  const markConversationAsRead = (contactId: string): void => {
    setConversations((prev) =>
      prev.map((c) => (c.contactId === contactId ? { ...c, unreadCount: 0 } : c))
    );
  };

  // Gửi tin nhắn mới và cập nhật "tin nhắn gần nhất" ở danh sách Home
  const sendMessage = (contactId: string, text: string): void => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeFormatted = `${hours}:${minutes}`;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderId: 'me',
      text: trimmed,
      timestamp: timeFormatted,
      createdAt: Date.now(),
    };

    // 1. Thêm tin nhắn vào danh sách tin nhắn của cuộc trò chuyện
    setMessages((prev) => {
      const currentList = prev[contactId] || [];
      return {
        ...prev,
        [contactId]: [...currentList, newMessage],
      };
    });

    // 2. Cập nhật lastMessage ở Home
    setConversations((prev) => {
      const exists = prev.some((c) => c.contactId === contactId);
      if (exists) {
        return prev.map((c) =>
          c.contactId === contactId
            ? {
                ...c,
                lastMessage: trimmed,
                lastMessageTime: timeFormatted,
              }
            : c
        );
      } else {
        const contact = contacts.find((ct) => ct.id === contactId);
        const newConv: Conversation = {
          id: `conv_${Date.now()}`,
          contactId,
          name: contact ? contact.name : 'Người dùng',
          avatar: contact ? contact.avatar : 'https://i.pravatar.cc/150?img=1',
          lastMessage: trimmed,
          lastMessageTime: timeFormatted,
          unreadCount: 0,
          isOnline: contact ? contact.isOnline : false,
        };
        return [newConv, ...prev];
      }
    });
  };

  // Đánh dấu 1 thông báo là đã đọc
  const markNotificationAsRead = (notificationId: string): void => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  // Đánh dấu toàn bộ thông báo là đã đọc
  const markAllNotificationsAsRead = (): void => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Lấy hoặc tạo mới cuộc trò chuyện khi chọn từ Danh bạ
  const getOrCreateConversation = (contact: Contact): Conversation => {
    const existing = conversations.find((c) => c.contactId === contact.id);
    if (existing) {
      return existing;
    }
    const newConv: Conversation = {
      id: `conv_${Date.now()}`,
      contactId: contact.id,
      name: contact.name,
      avatar: contact.avatar,
      lastMessage: 'Bắt đầu cuộc trò chuyện mới',
      lastMessageTime: 'Vừa xong',
      unreadCount: 0,
      isOnline: contact.isOnline,
    };
    setConversations((prev) => [newConv, ...prev]);
    return newConv;
  };

  const contextValue: AppContextType = {
    currentUser,
    conversations,
    contacts,
    notifications,
    messages,
    isDarkMode,
    notificationsEnabled,
    theme,
    unreadNotificationsCount,
    login,
    logout,
    toggleDarkMode,
    toggleNotificationsEnabled,
    markConversationAsRead,
    sendMessage,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getOrCreateConversation,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp phải được bọc trong AppProvider');
  }
  return context;
};
