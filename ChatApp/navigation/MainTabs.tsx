import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainTabParamList } from '../types';
import { HomeScreen } from '../screen/HomeScreen';
import { ContactsScreen } from '../screen/ContactsScreen';
import { NotificationsScreen } from '../screen/NotificationsScreen';
import { SettingsScreen } from '../screen/SettingsScreen';
import { useApp } from '../context/AppContext';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderHomeTabIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}): React.ReactNode => (
  <Icon
    name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
    size={size}
    color={color}
  />
);

const renderContactsTabIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}): React.ReactNode => (
  <Icon
    name={focused ? 'people' : 'people-outline'}
    size={size}
    color={color}
  />
);

const renderNotificationsTabIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}): React.ReactNode => (
  <Icon
    name={focused ? 'notifications' : 'notifications-outline'}
    size={size}
    color={color}
  />
);

const renderSettingsTabIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}): React.ReactNode => (
  <Icon
    name={focused ? 'settings' : 'settings-outline'}
    size={size}
    color={color}
  />
);

export const MainTabs: React.FC = () => {
  const { theme, unreadNotificationsCount } = useApp();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trò chuyện',
          tabBarIcon: renderHomeTabIcon,
        }}
      />

      <Tab.Screen
        name="ContactsTab"
        component={ContactsScreen}
        options={{
          tabBarLabel: 'Danh bạ',
          tabBarIcon: renderContactsTabIcon,
        }}
      />

      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarBadge:
            unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: theme.unreadBadge,
            fontSize: 10,
            fontWeight: '700',
          },
          tabBarIcon: renderNotificationsTabIcon,
        }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Cài đặt',
          tabBarIcon: renderSettingsTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};
