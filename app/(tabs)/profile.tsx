import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { prototypeImages } from '@/constants/prototype-images';

const menuItems = [
  { icon: 'payment', label: 'Paiements et facturation', danger: false },
  { icon: 'notifications', label: 'Notifications', danger: false },
  { icon: 'help', label: "Centre d'aide", danger: false },
  { icon: 'logout', label: 'Se déconnecter', danger: true },
] as const;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <View
        className="flex-row items-center justify-between bg-white px-5 pb-4"
        style={{ paddingTop: insets.top + 16 }}>
        <Text className="text-[32px] font-extrabold leading-10 tracking-tight text-neutral-950">Compte</Text>
        <Pressable className="h-11 w-11 items-center justify-center rounded-full bg-neutral-100" hitSlop={8}>
          <MaterialIcons name="settings" size={24} color="#171717" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        contentContainerClassName="gap-8 px-5 pt-4"
        showsVerticalScrollIndicator={false}>
        <View className="items-center">
          <View className="h-32 w-32 overflow-hidden rounded-full border border-neutral-100 bg-neutral-100" style={styles.avatar}>
            <Image source={prototypeImages.profileAlex} className="h-full w-full" contentFit="cover" />
          </View>
          <Text className="mt-4 text-2xl font-extrabold text-neutral-950">Alex K.</Text>
          <Text className="mt-1 text-xs font-semibold text-neutral-500">Membre depuis 2024</Text>
        </View>

        <View className="flex-row items-center justify-center rounded-2xl border border-neutral-100 bg-white px-4 py-6" style={styles.card}>
          <Stat value="12" label="Événements" />
          <Divider />
          <Stat value="3" label="Groupes" />
          <Divider />
          <Stat value="45" label="Abonnés" />
        </View>

        <View className="flex-row gap-4">
          <Pressable className="h-14 flex-1 items-center justify-center rounded-xl border border-neutral-300">
            <Text className="text-sm font-extrabold text-neutral-950">Modifier le profil</Text>
          </Pressable>
          <Pressable className="h-14 flex-1 items-center justify-center rounded-xl bg-[#ff5f00]" style={styles.share}>
            <Text className="text-sm font-extrabold text-white">Partager</Text>
          </Pressable>
        </View>

        <View className="overflow-hidden rounded-2xl border border-neutral-100 bg-white" style={styles.menu}>
          {menuItems.map((item, index) => (
            <MenuRow key={item.label} item={item} isLast={index === menuItems.length - 1} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View className="flex-1 items-center">
      <Text className="text-2xl font-extrabold text-neutral-950">{value}</Text>
      <Text className="mt-1 text-[11px] font-bold uppercase tracking-wider text-neutral-500">{label}</Text>
    </View>
  );
}

function Divider() {
  return <View className="h-10 w-px bg-neutral-200" />;
}

function MenuRow({
  item,
  isLast,
}: {
  item: (typeof menuItems)[number];
  isLast: boolean;
}) {
  const color = item.danger ? '#ba1a1a' : '#737373';
  const bg = item.danger ? '#ffdad6' : '#eeeeee';

  return (
    <Pressable className={`flex-row items-center justify-between p-4 ${isLast ? '' : 'border-b border-neutral-200'}`}>
      <View className="flex-1 flex-row items-center">
        <View className="h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: bg }}>
          <MaterialIcons name={item.icon} size={22} color={color} />
        </View>
        <Text className={`ml-4 flex-1 text-base font-semibold ${item.danger ? 'text-[#ba1a1a]' : 'text-neutral-950'}`}>
          {item.label}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 22,
  },
  card: {
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 22,
  },
  share: {
    elevation: 4,
    shadowColor: '#ff5f00',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
  },
  menu: {
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 22,
  },
});
