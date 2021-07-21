import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function Load() {
  const { primary } = theme.colors;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={primary} />
    </View>
  );
}
