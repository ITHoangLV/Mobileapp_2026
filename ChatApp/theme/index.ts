export interface ThemeColors {
  primary: string;
  primaryLight: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  danger: string;
  success: string;
  warning: string;
  white: string;
  myBubble: string;
  otherBubble: string;
  myBubbleText: string;
  otherBubbleText: string;
  unreadBadge: string;
  online: string;
  offline: string;
  inputBackground: string;
}

export const lightTheme: ThemeColors = {
  primary: '#0084FF',
  primaryLight: '#E7F3FF',
  background: '#F5F6FA',
  card: '#FFFFFF',
  text: '#1C1E21',
  textSecondary: '#65676B',
  textMuted: '#8A8D91',
  border: '#E4E6EB',
  danger: '#FA383E',
  success: '#31A24C',
  warning: '#F7B125',
  white: '#FFFFFF',
  myBubble: '#0084FF',
  otherBubble: '#E4E6EB',
  myBubbleText: '#FFFFFF',
  otherBubbleText: '#050505',
  unreadBadge: '#FA383E',
  online: '#31A24C',
  offline: '#8A8D91',
  inputBackground: '#F0F2F5',
};

export const darkTheme: ThemeColors = {
  primary: '#0084FF',
  primaryLight: '#182C44',
  background: '#18191A',
  card: '#242526',
  text: '#E4E6EB',
  textSecondary: '#B0B3B8',
  textMuted: '#71757A',
  border: '#393A3B',
  danger: '#FA383E',
  success: '#31A24C',
  warning: '#F7B125',
  white: '#FFFFFF',
  myBubble: '#0084FF',
  otherBubble: '#3A3B3C',
  myBubbleText: '#FFFFFF',
  otherBubbleText: '#E4E6EB',
  unreadBadge: '#FA383E',
  online: '#31A24C',
  offline: '#71757A',
  inputBackground: '#3A3B3C',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  title: 28,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 9999,
};
