import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { prototypeImages } from '@/constants/prototype-images';
import { type EventItem, events } from '@/constants/events';

const avatarImages = prototypeImages.avatars.slice(0, 3);

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="px-5 pb-8"
        contentContainerStyle={{ paddingTop: insets.top + 16 }}
        showsVerticalScrollIndicator={false}>
        <View className="mb-5 flex-row items-center gap-3">
          <View className="h-14 flex-1 flex-row items-center rounded-full bg-neutral-100 px-4">
            <MaterialIcons name="search" size={24} color="#a3a3a3" />
            <TextInput
              className="ml-3 flex-1 text-[15px] text-neutral-900"
              placeholder="Rechercher des événements..."
              placeholderTextColor="#a3a3a3"
            />
            <Link href="/search-map" asChild>
              <Pressable className="h-9 w-9 items-center justify-center rounded-full" hitSlop={10}>
                <MaterialIcons name="tune" size={24} color="#737373" />
              </Pressable>
            </Link>
          </View>
          <Link href="/create-event" asChild>
            <Pressable className="h-14 w-14 items-center justify-center rounded-full bg-[#ff5f00]" style={styles.createButton}>
              <MaterialIcons name="add" size={28} color="#ffffff" />
            </Pressable>
          </Link>
        </View>

        <ScrollView
          horizontal
          className="mb-4"
          contentContainerClassName="gap-2"
          showsHorizontalScrollIndicator={false}>
          {['À venir', "Aujourd'hui", 'Demain', 'Week-end'].map((filter, index) => (
            <Pressable
              key={filter}
              className={`rounded-full px-5 py-2.5 ${index === 0 ? 'bg-[#ff5f00]' : 'bg-white'}`}>
              <Text className={`text-sm font-bold ${index === 0 ? 'text-white' : 'text-neutral-700'}`}>
                {filter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          className="mb-6 border-b border-neutral-200"
          contentContainerClassName="gap-7"
          showsHorizontalScrollIndicator={false}>
          {[
            ['auto-awesome', 'Tous les événements'],
            ['group', 'Nouveaux groupes'],
            ['diversity-3', 'Vos groupes'],
            ['calendar-month', 'Activités'],
          ].map(([icon, label], index) => (
            <Pressable key={label} className="items-center gap-1 pb-3">
              <MaterialIcons name={icon as keyof typeof MaterialIcons.glyphMap} size={23} color={index === 0 ? '#171717' : '#737373'} />
              <Text className={`text-xs font-bold ${index === 0 ? 'text-neutral-900' : 'text-neutral-500'}`}>
                {label}
              </Text>
              {index === 0 ? <View className="absolute bottom-0 h-0.5 w-full rounded-full bg-[#ff5f00]" /> : null}
            </Pressable>
          ))}
        </ScrollView>

        <View className="gap-5">
          {events.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function EventCard({ event }: { event: EventItem }) {
  return (
    <Link href={{ pathname: '/event', params: { id: event.id } }} asChild>
      <Pressable className="overflow-hidden rounded-2xl bg-white" style={styles.card}>
        <View className="h-60 w-full bg-neutral-100">
          <Image source={event.image} className="h-full w-full" resizeMode="cover" />
          <View className="absolute inset-0 bg-black/20" />
          <View className="absolute right-4 top-4 h-10 w-10 items-center justify-center rounded-full bg-white/25">
            <MaterialIcons name="bookmark-border" size={24} color="#ffffff" />
          </View>
        </View>

        <View className="p-4">
          <Text className="mb-1 text-2xl font-extrabold tracking-tight text-neutral-950">{event.title}</Text>
          <Text className="mb-1 text-sm font-extrabold uppercase text-[#ff5f00]">{event.shortDate}</Text>
          <Text className="mb-4 text-sm text-neutral-600">
            {event.group} · ★ {event.rating}
          </Text>

          <View className="flex-row items-center">
            <View className="flex-row">
              {avatarImages.map((avatar, index) => (
                <Image
                  key={index}
                  source={avatar}
                  className="h-8 w-8 rounded-full border-2 border-white"
                  style={index > 0 ? styles.avatarOverlap : null}
                  resizeMode="cover"
                />
              ))}
            </View>
            <Text className="ml-3 text-xs font-semibold text-neutral-500">{event.participants}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
  },
  avatarOverlap: {
    marginLeft: -8,
  },
  createButton: {
    elevation: 4,
    shadowColor: '#ff5f00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
  },
});
