import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GuildIcon } from '../GuildIcon';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export type DataProps = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
};

type GuildProps = TouchableOpacityProps & {
  data: DataProps;
};

export function Guild({ data, ...rest }: GuildProps) {
  const { heading } = theme.colors;
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      <GuildIcon guildId={data.id} iconId={data.icon} />
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.type}>
            {data.owner ? 'Administrator' : 'Convidado'}
          </Text>
        </View>
      </View>
      <Feather name="chevron-right" size={24} color={heading} />
    </TouchableOpacity>
  );
}
