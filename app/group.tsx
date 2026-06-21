import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { prototypeImages } from '@/constants/prototype-images';

const tinyAvatars = prototypeImages.avatars.slice(4, 6);

export default function GroupScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <View
        className="absolute left-0 right-0 top-0 z-10 flex-row items-center justify-between bg-white px-5 pb-3"
        style={{ paddingTop: insets.top + 8 }}>
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full"
          hitSlop={10}
          onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios-new" size={22} color="#171717" />
        </Pressable>
        <View className="flex-row gap-3">
          <Pressable className="h-10 w-10 items-center justify-center rounded-full" hitSlop={10}>
            <MaterialIcons name="ios-share" size={24} color="#171717" />
          </Pressable>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full" hitSlop={10}>
            <MaterialIcons name="more-horiz" size={26} color="#171717" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{
          paddingTop: insets.top + 64,
          paddingBottom: insets.bottom + 32,
        }}
        showsVerticalScrollIndicator={false}>
        <View className="aspect-[4/3] w-full bg-neutral-100">
          <Image source={prototypeImages.groupCover} className="h-full w-full" contentFit="cover" />
        </View>

        <View className="px-5 pb-3 pt-6">
          <Text className="mb-2 text-[32px] font-extrabold leading-10 tracking-tight text-neutral-950">
            Lomé Food Fanatics
          </Text>
          <View className="flex-row flex-wrap items-center gap-x-5 gap-y-2">
            <View className="flex-row items-center">
              <MaterialIcons name="location-on" size={18} color="#737373" />
              <Text className="ml-1 text-base text-neutral-600">Lomé, Togo</Text>
            </View>
            <View className="flex-row items-center">
              <MaterialIcons name="group" size={18} color="#737373" />
              <Text className="ml-1 text-base text-neutral-600">1 245 membres</Text>
            </View>
          </View>
        </View>

        <View className="px-5 py-4">
          <Pressable className="h-14 items-center justify-center rounded-xl bg-[#ff5f00]" style={styles.ctaShadow}>
            <Text className="text-sm font-extrabold text-white">Rejoindre le groupe</Text>
          </Pressable>
        </View>

        <View className="flex-row items-center px-5 pb-5">
          <Image source={prototypeImages.avatars[5]} className="h-12 w-12 rounded-full" contentFit="cover" />
          <View className="ml-4">
            <Text className="text-xs font-semibold text-neutral-500">Organisé par</Text>
            <Text className="mt-0.5 text-sm font-extrabold text-neutral-950">Sarah M.</Text>
          </View>
        </View>

        <View className="mx-5 mb-7 flex-row gap-6 border-b border-neutral-200">
          <Pressable className="border-b-2 border-[#ff5f00] pb-3">
            <Text className="text-sm font-extrabold text-neutral-950">À propos</Text>
          </Pressable>
          <Pressable className="pb-3">
            <Text className="text-sm font-extrabold text-neutral-500">Événements (2)</Text>
          </Pressable>
          <Pressable className="pb-3">
            <Text className="text-sm font-extrabold text-neutral-500">Membres</Text>
          </Pressable>
        </View>

        <View className="px-5 pb-8">
          <Text className="mb-4 text-2xl font-extrabold text-neutral-950">À propos</Text>
          <Text className="text-base leading-7 text-neutral-600">
            Rejoignez la plus grande communauté de passionnés de gastronomie à Lomé. Nous organisons des
            pique-niques, des dégustations et des ateliers...
            <Text className="font-extrabold text-neutral-950"> Lire la suite</Text>
          </Text>
        </View>

        <View className="px-5">
          <Text className="mb-5 text-2xl font-extrabold text-neutral-950">Prochain événement</Text>
          <Link href="/event" asChild>
            <Pressable className="flex-row gap-4 rounded-2xl border border-neutral-200 bg-white p-3" style={styles.eventCard}>
              <Image source={prototypeImages.streetFood} className="h-24 w-24 rounded-xl" contentFit="cover" />
              <View className="flex-1 justify-center">
                <Text className="mb-1 text-sm font-extrabold text-[#ff5f00]">Ven. 14 juin · 18h00</Text>
                <Text className="text-xl font-extrabold leading-6 text-neutral-950">Dîner de rue</Text>
                <View className="mt-3 flex-row items-center">
                  <View className="flex-row">
                    {tinyAvatars.map((avatar, index) => (
                      <Image
                        key={index}
                        source={avatar}
                        className="h-6 w-6 rounded-full border-2 border-white"
                        style={index > 0 ? styles.smallAvatarOverlap : null}
                        contentFit="cover"
                      />
                    ))}
                  </View>
                  <Text className="ml-2 flex-1 text-xs font-semibold text-neutral-500">15 participants y vont</Text>
                </View>
              </View>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ctaShadow: {
    elevation: 4,
    shadowColor: '#ff5f00',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 22,
  },
  eventCard: {
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
  },
  smallAvatarOverlap: {
    marginLeft: -8,
  },
});
