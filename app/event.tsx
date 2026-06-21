import { Link, router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { prototypeImages } from '@/constants/prototype-images';
import { findEventById } from '@/constants/events';

const attendeeImages = prototypeImages.avatars.slice(1, 4);

export default function EventScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id?: string }>();
  const event = findEventById(params.id);
  const { width } = useWindowDimensions();
  const heroHeight = Math.min(320, Math.max(220, width * 0.66));
  const headerOffset = insets.top + 58;

  return (
    <View className="flex-1 bg-white">
      <View
        className="absolute left-0 right-0 top-0 z-10 flex-row items-center justify-between bg-white/90 px-5 pb-3"
        style={{ paddingTop: insets.top + 8 }}>
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full"
          hitSlop={10}
          onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={25} color="#171717" />
        </Pressable>
        <View className="flex-row gap-2">
          <Pressable className="h-10 w-10 items-center justify-center rounded-full" hitSlop={10}>
            <MaterialIcons name="share" size={24} color="#171717" />
          </Pressable>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full" hitSlop={10}>
            <MaterialIcons name="favorite-border" size={25} color="#171717" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{
          paddingTop: headerOffset + 14,
          paddingBottom: insets.bottom + 132,
        }}
        showsVerticalScrollIndicator={false}>
        <View
          className="mx-5 mb-5 overflow-hidden rounded-3xl bg-neutral-100"
          style={[styles.heroShadow, { height: heroHeight }]}>
          <Image
            source={event.image}
            className="h-full w-full"
            resizeMode="cover"
          />
          <View className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5">
            <Text className="text-xs font-extrabold uppercase text-[#ff5f00]">{event.date}</Text>
          </View>
          <View className="absolute bottom-4 right-4 rounded-full bg-green-600 px-3.5 py-2">
            <Text className="text-xs font-extrabold text-white">{event.badge}</Text>
          </View>
        </View>

        <View className="px-5">
          <View className="mb-5">
            <Text className="text-[34px] font-extrabold leading-10 tracking-tight text-neutral-950">
              {event.title}
            </Text>
            <Link href="/group" asChild>
              <Pressable className="mt-2">
                <Text className="text-lg leading-7 text-neutral-600">
                  Organisé par <Text className="font-extrabold text-neutral-950">{event.group}</Text>
                </Text>
              </Pressable>
            </Link>
          </View>

          <View className="mb-6 flex-row items-center rounded-2xl border border-neutral-100 bg-white p-3" style={styles.softCard}>
            <View className="flex-row">
              {attendeeImages.map((image, index) => (
                <Image
                  key={index}
                  source={image}
                  className="h-10 w-10 rounded-full border-2 border-white"
                  style={index > 0 ? styles.avatarOverlap : null}
                  resizeMode="cover"
                />
              ))}
              <View className="-ml-3 h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-neutral-200">
                <Text className="text-xs font-extrabold text-neutral-600">+104</Text>
              </View>
            </View>
            <Text className="ml-3 flex-1 text-base leading-6 text-neutral-700">{event.participantCount}</Text>
          </View>

          <View className="mb-6">
            <Text className="mb-3 text-2xl font-extrabold text-neutral-950">Aperçu</Text>
            <Text className="text-base leading-7 text-neutral-600">
              {event.description}
            </Text>
            <Pressable className="mt-2 flex-row items-center">
              <Text className="text-sm font-extrabold text-neutral-950">En savoir plus</Text>
              <MaterialIcons name="chevron-right" size={18} color="#171717" />
            </Pressable>
          </View>

          <View className="mb-6 gap-4 rounded-2xl border border-neutral-100 bg-white p-5" style={styles.softCard}>
            <InfoRow icon="calendar-today" title={event.date} subtitle={event.time} />
            <View className="h-px bg-neutral-200" />
            <InfoRow icon="location-on" title={event.location} subtitle={event.city} />
          </View>
        </View>
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-5 pt-4"
        style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="text-2xl font-extrabold text-neutral-950">{event.price}</Text>
            <Text className="text-base text-neutral-600">{event.footerDate}</Text>
          </View>
          <Link href={{ pathname: '/success', params: { id: event.id } }} asChild>
            <Pressable className="h-14 min-w-36 items-center justify-center rounded-full bg-[#ff5f00] px-7">
              <Text className="text-sm font-extrabold text-white">Participer</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

function InfoRow({
  icon,
  title,
  subtitle,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
}) {
  return (
    <View className="flex-row items-start">
      <View className="h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
        <MaterialIcons name={icon} size={22} color="#ff5f00" />
      </View>
      <View className="ml-4">
        <Text className="text-lg font-semibold text-neutral-950">{title}</Text>
        <Text className="mt-0.5 text-base text-neutral-600">{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroShadow: {
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
  },
  softCard: {
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
  },
  avatarOverlap: {
    marginLeft: -12,
  },
  footer: {
    elevation: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
  },
});
