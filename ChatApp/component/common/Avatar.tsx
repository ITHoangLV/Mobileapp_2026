import React, { useState } from 'react';
import { View, Image, StyleSheet, ImageStyle, ViewStyle } from 'react-native';
import { useApp } from '../../context/AppContext';

interface Props {
  uri: string;
  size?: number;
  showOnline?: boolean;
  isOnline?: boolean;
  style?: ViewStyle;
}

export const Avatar: React.FC<Props> = ({
  uri,
  size = 50,
  showOnline = false,
  isOnline = false,
  style,
}) => {
  const { theme } = useApp();
  const [hasError, setHasError] = useState(false);

  // Kích thước của chấm trạng thái hoạt động tỉ lệ theo size avatar
  const badgeSize = Math.max(10, Math.round(size * 0.26));

  const imageStyle: ImageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: theme.border,
  };

  const fallbackUri = `https://ui-avatars.com/api/?background=0084FF&color=fff&size=150&name=User`;

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Image
        source={{ uri: hasError ? fallbackUri : uri }}
        style={imageStyle}
        onError={() => setHasError(true)}
      />
      {showOnline && (
        <View
          style={[
            styles.badge,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: isOnline ? theme.online : theme.offline,
              borderColor: theme.card,
              borderWidth: 2,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
