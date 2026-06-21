import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { prototypeImages } from '@/constants/prototype-images';

const tickets = [
  {
    title: 'Se détendre au parc',
    date: 'Mar. 10 juin · 11h30',
    location: 'Parc Lomé',
    type: '1x Billet Standard',
    order: '#TM-8492',
    image: prototypeImages.ticketPicnic,
    qr: prototypeImages.qrPark,
  },
  {
    title: 'Afterwork Tech & Networking',
    date: 'Ven. 14 juin · 18h00',
    location: 'Orange Fab Lomé',
    type: '1x Entrée VIP',
    order: '#TM-9103',
    image: prototypeImages.ticketTech,
    qr: prototypeImages.qrTech,
  },
];

export default function TicketsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <View className="bg-white px-5 pb-4" style={{ paddingTop: insets.top + 16 }}>
        <Text className="text-[40px] font-extrabold leading-[48px] tracking-tight text-neutral-950">Billets</Text>
      </View>

      <View className="flex-row border-b border-neutral-200 bg-white px-5">
        <View className="flex-1 border-b-2 border-[#ff5f00] pb-3">
          <Text className="text-center text-sm font-extrabold text-neutral-950">À venir</Text>
        </View>
        <View className="flex-1 border-b-2 border-transparent pb-3">
          <Text className="text-center text-sm font-extrabold text-neutral-500">Passés</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="gap-6 px-5 pt-6"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}>
        {tickets.map((ticket) => (
          <TicketCard key={ticket.order} ticket={ticket} />
        ))}
      </ScrollView>
    </View>
  );
}

type Ticket = (typeof tickets)[number];

function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white" style={styles.ticketCard}>
      <View className="absolute right-4 top-4 z-10 rounded-full bg-[#E8F5E9] px-2 py-1">
        <Text className="text-[10px] font-extrabold text-[#2E7D32]">Confirmé</Text>
      </View>

      <View className="flex-row gap-4 p-4">
        <Image source={ticket.image} className="h-16 w-16 rounded-xl" contentFit="cover" />
        <View className="flex-1 justify-center pr-12">
          <Text className="mb-1 text-lg font-extrabold leading-6 text-neutral-950">{ticket.title}</Text>
          <Text className="text-sm font-extrabold text-[#ff5f00]">{ticket.date}</Text>
          <Text className="text-xs font-semibold text-neutral-500">{ticket.location}</Text>
        </View>
      </View>

      <View className="relative mx-4">
        <View className="h-px border-t-2 border-dashed border-neutral-200" />
        <View className="absolute -left-7 -top-2.5 h-5 w-5 rounded-full bg-white" />
        <View className="absolute -right-7 -top-2.5 h-5 w-5 rounded-full bg-white" />
      </View>

      <View className="flex-row items-center gap-4 p-4">
        <View className="h-16 w-16 items-center justify-center rounded bg-neutral-200 p-1">
          <Image source={ticket.qr} className="h-full w-full" contentFit="cover" />
        </View>
        <View>
          <Text className="text-base font-extrabold text-neutral-950">{ticket.type}</Text>
          <Text className="text-xs font-semibold text-neutral-500">Commande : {ticket.order}</Text>
        </View>
        <View className="ml-auto">
          <MaterialIcons name="qr-code-scanner" size={24} color="#737373" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ticketCard: {
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 22,
  },
});
