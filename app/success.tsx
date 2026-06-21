import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { findEventById } from '@/constants/events';

export default function SuccessScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id?: string }>();
  const event = findEventById(params.id);

  return (
    <View className="flex-1 bg-white px-5" style={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}>
      <View className="flex-1 items-center justify-center">
        <View className="mb-8 h-32 w-32 items-center justify-center rounded-full bg-[#ff5f00]" style={styles.check}>
          <MaterialIcons name="check" size={68} color="#ffffff" />
        </View>

        <View className="mb-10 items-center">
          <Text className="mb-3 text-center text-[32px] font-extrabold leading-10 text-neutral-950">
            Réservation confirmée !
          </Text>
          <Text className="text-center text-base leading-6 text-neutral-500">
            Votre place a été réservée avec succès.
          </Text>
        </View>

        <View className="w-full rounded-2xl border border-neutral-200 bg-white p-5" style={styles.ticketSummary}>
          <View className="mb-4 flex-row items-start justify-between gap-4">
            <View className="flex-1">
              <Text className="mb-1 text-2xl font-extrabold text-neutral-950">{event.title}</Text>
              <Text className="text-base text-neutral-500">{event.footerDate}</Text>
            </View>
            <Text className="text-2xl font-extrabold text-[#ff5f00]">{event.price}</Text>
          </View>

          <View className="flex-row items-center border-t border-neutral-200 pt-4">
            <MaterialIcons name="confirmation-number" size={24} color="#737373" />
            <Text className="ml-2 text-base font-semibold text-neutral-950">{event.ticketType}</Text>
          </View>
        </View>
      </View>

      <View className="gap-4">
        <Pressable
          className="h-14 items-center justify-center rounded-full bg-[#ff5f00]"
          style={styles.primary}
          onPress={() => router.replace('/tickets')}>
          <Text className="text-sm font-extrabold text-white">Voir mon billet</Text>
        </Pressable>

        <Pressable
          className="h-14 items-center justify-center rounded-full"
          onPress={() => router.replace('/(tabs)')}>
          <Text className="text-sm font-extrabold text-neutral-500">Retour à l&apos;accueil</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  check: {
    elevation: 5,
    shadowColor: '#ff5f00',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
  },
  ticketSummary: {
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 22,
  },
  primary: {
    elevation: 4,
    shadowColor: '#ff5f00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
  },
});
