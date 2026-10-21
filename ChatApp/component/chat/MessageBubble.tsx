import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../../types';
import { useApp } from '../../context/AppContext';
import { Spacing, FontSize, BorderRadius } from '../../theme';

interface Props {
  message: Message;
  isMe: boolean;
}

export const MessageBubble: React.FC<Props> = ({ message, isMe }) => {
  const { theme } = useApp();

  return (
    <View
      style={[
        styles.wrapper,
        isMe ? styles.wrapperMe : styles.wrapperOther,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isMe
            ? [
                styles.bubbleMe,
                { backgroundColor: theme.myBubble },
              ]
            : [
                styles.bubbleOther,
                { backgroundColor: theme.otherBubble },
              ],
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: isMe ? theme.myBubbleText : theme.otherBubbleText },
          ]}
        >
          {message.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            {
              color: isMe ? 'rgba(255, 255, 255, 0.75)' : theme.textMuted,
              textAlign: isMe ? 'right' : 'left',
            },
          ]}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
  },
  wrapperMe: {
    justifyContent: 'flex-end',
  },
  wrapperOther: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
    borderRadius: BorderRadius.lg,
  },
  bubbleMe: {
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: FontSize.md,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: FontSize.xs - 1,
    marginTop: 4,
  },
});
