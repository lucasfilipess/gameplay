import React from 'react';
import { View, ImageBackground, Text, FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import BannerImg from '../../assets/banner.png';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { ButtonIcon } from '../../components/ButtonIcon';

export function AppointmentDetails() {
  const { primary } = theme.colors;

  const members = [
    {
      id: '1',
      username: 'Lucas',
      avatarUrl: 'https://github.com/lucasfilipess.png',
      status: 'online',
    },
    {
      id: '2',
      username: 'Lucas',
      avatarUrl: 'https://github.com/lucasfilipess.png',
      status: 'online',
    },
  ];

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={primary} />
          </BorderlessButton>
        }
      />
      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.subtitle}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>
      </ImageBackground>
      <ListHeader title="Jogadores" subtitle="Total 3" />
      <FlatList
        style={styles.members}
        data={members}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Member data={item} />}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
      />
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  );
}
