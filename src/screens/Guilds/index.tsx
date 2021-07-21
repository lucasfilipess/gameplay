import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { View, FlatList } from 'react-native';
import { Guild, DataProps as GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';
import { api } from '../../services/api';
import { styles } from './styles';

type GuildsProps = {
  handleGuildSelect: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelect }: GuildsProps) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchGuilds() {
    try {
      const { data } = await api.get('/users/@me/guilds');
      setGuilds(data);
    } catch (error) {
      Alert.alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Load />
      ) : (
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
      )}
    </View>
  );
}
