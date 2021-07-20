import React from 'react';
import { View, FlatList } from 'react-native';
import { Guild, DataProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { styles } from './styles';

type GuildsProps = {
  handleGuildSelect: (guild: DataProps) => void;
};

export function Guilds({ handleGuildSelect }: GuildsProps) {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'https://wallpaperaccess.com/full/5578398.jpg',
      owner: true,
    },
    {
      id: '2',
      name: 'Lendários',
      icon: 'https://wallpaperaccess.com/full/5578398.jpg',
      owner: false,
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.guilds}
        data={guilds}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelect(item)} />
        )}
        ListHeaderComponent={() => <ListDivider isCentered />}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
