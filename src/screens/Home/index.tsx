import React, { useCallback, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Appointment,
  DataProps as AppointmentProps,
} from '../../components/Appointment';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';
import { Load } from '../../components/Load';
import { COLLECTION_APPOINTMENTS } from '../../config/database';
import { styles } from './styles';

export function Home() {
  const [category, setCategory] = useState<string>('');
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { navigate } = useNavigation();

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigate('AppointmentDetails', { guildSelected });
  }

  function handleAppointmentCreate() {
    navigate('AppointmentCreate');
  }

  async function loadAppointments() {
    try {
      const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
      const appointmentsStorage: AppointmentProps[] = storage
        ? JSON.parse(storage)
        : [];
      if (category) {
        setAppointments(
          appointmentsStorage.filter(
            (appointment) => appointment.category === category
          )
        );
      } else {
        setAppointments(appointmentsStorage);
      }
    } catch (error) {
      Alert.alert(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />
          <FlatList
            style={styles.matches}
            data={appointments}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 69 }}
            ItemSeparatorComponent={() => <ListDivider />}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Background>
  );
}
