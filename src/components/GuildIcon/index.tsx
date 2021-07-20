import React from 'react';
import { Image } from 'react-native';
import { styles } from './styles';

export type GuildIconProps = {
  uri: string;
};

export function GuildIcon({ uri }: GuildIconProps) {
  return <Image source={{ uri }} style={styles.image} resizeMode="cover" />;
}
