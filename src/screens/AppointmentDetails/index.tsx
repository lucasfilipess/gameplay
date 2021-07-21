import React, { useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  Text,
  FlatList,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import { useRoute } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';
import { api } from '../../services/api';
import { DataProps as AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, DataProps as MembersProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import BannerImg from '../../assets/banner.png';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { Load } from '../../components/Load';

type ParamsProps = {
  guildSelected: AppointmentProps;
};

type WidgetProps = {
  id: string;
  name: string;
  instant_invite: string;
  members: MembersProps[];
};

export function AppointmentDetails() {
  const { primary } = theme.colors;
  const { params } = useRoute();
  const { guildSelected } = params as ParamsProps;
  const [widget, setWidget] = useState<WidgetProps>({} as WidgetProps);
  const [loading, setLoading] = useState<boolean>(true);

  const redirect = guildSelected.guild.owner && widget.instant_invite;

  async function fetchGuildWidget() {
    try {
      const { data } = await api.get(
        `/guilds/${guildSelected.guild.id}/widget.json`
      );
      setWidget(data);
    } catch {
      Alert.alert(
        'Verifique as configurações do servidor. É necessário habilitar o Widget nas configurações do servidor.'
      );
    } finally {
      setLoading(false);
    }
  }

  function handleOpenLinking() {
    if (widget.instant_invite) Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  function handleShareInvitation() {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite;
    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          redirect && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={primary} />
            </BorderlessButton>
          )
        }
      />
      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>
      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget.members?.length || 0}`}
          />
          <FlatList
            style={styles.members}
            data={widget.members}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
          />
          {redirect && (
            <View style={styles.footer}>
              <ButtonIcon
                title="Entrar na partida"
                onPress={handleOpenLinking}
              />
            </View>
          )}
        </>
      )}
    </Background>
  );
}
