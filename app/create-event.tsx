import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { prototypeImages } from '@/constants/prototype-images';

const coverOptions = [
  { id: 'park', label: 'Parc', image: prototypeImages.discoverPark },
  { id: 'tech', label: 'Tech', image: prototypeImages.discoverAfricaTech },
  { id: 'culture', label: 'Culture', image: prototypeImages.discoverWestAfricaFestival },
  { id: 'innovation', label: 'Innovation', image: prototypeImages.discoverIngenieuseAfrique },
  { id: 'business', label: 'Business', image: prototypeImages.discoverAecGroup },
];

export default function CreateEventScreen() {
  const insets = useSafeAreaInsets();
  const [coverIndex, setCoverIndex] = useState(0);
  const [isPrivate, setIsPrivate] = useState(true);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('Sam. 22 juin');
  const [time, setTime] = useState('18h00 - 21h00');
  const [location, setLocation] = useState('Lomé, Togo');
  const [group, setGroup] = useState('Toi & Moi Community');
  const [price, setPrice] = useState('Gratuit');
  const [ticketType, setTicketType] = useState('Billet Standard');
  const [participants, setParticipants] = useState('50');
  const [description, setDescription] = useState('');

  const imagePulse = useRef(new Animated.Value(1)).current;
  const toggleAnim = useRef(new Animated.Value(1)).current;

  const activeCover = coverOptions[coverIndex];
  const completedFields = useMemo(
    () =>
      [title, date, time, location, group, price, ticketType, participants, description].filter((value) =>
        value.trim(),
      ).length,
    [date, description, group, location, participants, price, ticketType, time, title],
  );
  const progress = Math.round((completedFields / 9) * 100);

  useEffect(() => {
    Animated.spring(toggleAnim, {
      toValue: isPrivate ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 90,
    }).start();
  }, [isPrivate, toggleAnim]);

  const selectCover = (index: number) => {
    setCoverIndex(index);
    imagePulse.setValue(0.97);
    Animated.spring(imagePulse, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
      tension: 120,
    }).start();
  };

  const publish = () => {
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-white">
      <View
        className="absolute left-0 right-0 top-0 z-10 flex-row items-center justify-between bg-white px-5"
        style={[styles.header, { paddingTop: insets.top, height: insets.top + 64 }]}>
        <Pressable className="h-11 w-11 items-center justify-center rounded-full" hitSlop={10} onPress={() => router.back()}>
          <MaterialIcons name="close" size={25} color="#171717" />
        </Pressable>
        <Text className="text-2xl font-extrabold text-neutral-950">Nouvel événement</Text>
        <Pressable className="h-11 justify-center">
          <Text className="text-sm font-extrabold text-[#ff5f00]">Brouillon</Text>
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="gap-6 px-5"
        contentContainerStyle={{
          paddingTop: insets.top + 88,
          paddingBottom: insets.bottom + 128,
        }}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={{ transform: [{ scale: imagePulse }] }}>
          <Pressable
            className="h-52 overflow-hidden rounded-3xl bg-neutral-100"
            style={styles.cover}
            onPress={() => selectCover((coverIndex + 1) % coverOptions.length)}>
            <Image source={activeCover.image} className="h-full w-full" resizeMode="cover" />
            <View className="absolute inset-0 bg-black/20" />
            <View className="absolute bottom-4 left-4 right-4 flex-row items-center justify-between">
              <View>
                <Text className="text-xs font-extrabold uppercase text-white/80">Image de couverture</Text>
                <Text className="text-xl font-extrabold text-white">{activeCover.label}</Text>
              </View>
              <View className="h-12 w-12 items-center justify-center rounded-full bg-white/25">
                <MaterialIcons name="photo-camera" size={25} color="#ffffff" />
              </View>
            </View>
          </Pressable>
        </Animated.View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3">
          {coverOptions.map((cover, index) => {
            const active = index === coverIndex;

            return (
              <Pressable key={cover.id} onPress={() => selectCover(index)} className="items-center">
                <View className={`h-16 w-20 overflow-hidden rounded-2xl ${active ? 'border-2 border-[#ff5f00]' : ''}`}>
                  <Image source={cover.image} className="h-full w-full" resizeMode="cover" />
                </View>
                <Text className={`mt-1 text-xs font-bold ${active ? 'text-[#ff5f00]' : 'text-neutral-500'}`}>
                  {cover.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View className="rounded-2xl bg-neutral-100 p-4">
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-sm font-extrabold text-neutral-950">Progression</Text>
            <Text className="text-sm font-extrabold text-[#ff5f00]">{progress}%</Text>
          </View>
          <View className="h-2 overflow-hidden rounded-full bg-neutral-200">
            <View className="h-full rounded-full bg-[#ff5f00]" style={{ width: `${progress}%` }} />
          </View>
        </View>

        <View className="gap-5">
          <TextInput
            className="border-b border-neutral-300 pb-2 text-[32px] font-extrabold leading-10 text-neutral-950"
            placeholder="Titre de l'événement"
            placeholderTextColor="#949494"
            value={title}
            onChangeText={setTitle}
          />

          <View className="flex-row gap-3">
            <FormInput icon="calendar-today" label="Date" value={date} onChangeText={setDate} />
            <FormInput icon="schedule" label="Heure" value={time} onChangeText={setTime} />
          </View>

          <FormInput icon="location-on" label="Lieu" value={location} onChangeText={setLocation} />
          <FormInput icon="groups" label="Groupe organisateur" value={group} onChangeText={setGroup} />

          <View className="flex-row gap-3">
            <FormInput icon="payments" label="Prix" value={price} onChangeText={setPrice} />
            <FormInput icon="confirmation-number" label="Type billet" value={ticketType} onChangeText={setTicketType} />
          </View>

          <FormInput icon="person" label="Participants attendus" value={participants} onChangeText={setParticipants} keyboardType="number-pad" />

          <TextInput
            className="min-h-32 rounded-2xl bg-neutral-100 p-4 text-base leading-6 text-neutral-950"
            placeholder="Parlez-nous de votre événement..."
            placeholderTextColor="#737373"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />

          <View className="flex-row items-center justify-between rounded-2xl bg-neutral-100 p-4">
            <View>
              <Text className="text-lg font-extrabold text-neutral-950">Événement privé</Text>
              <Text className="mt-1 text-sm text-neutral-500">Visible uniquement par invitation</Text>
            </View>
            <Pressable
              onPress={() => setIsPrivate((value) => !value)}
              className={`h-8 justify-center rounded-full px-1 ${isPrivate ? 'bg-[#ff5f00]' : 'bg-neutral-300'}`}
              style={{ width: 58 }}>
              <Animated.View
                className="h-6 w-6 rounded-full bg-white"
                style={{
                  transform: [
                    {
                      translateX: toggleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 26],
                      }),
                    },
                  ],
                }}
              />
            </Pressable>
          </View>

          <View className="rounded-3xl border border-neutral-200 bg-white p-4" style={styles.preview}>
            <Text className="mb-3 text-sm font-extrabold uppercase text-neutral-500">Aperçu public</Text>
            <View className="flex-row gap-3">
              <Image source={activeCover.image} className="h-20 w-20 rounded-2xl" resizeMode="cover" />
              <View className="flex-1 justify-center">
                <Text className="text-lg font-extrabold text-neutral-950" numberOfLines={2}>
                  {title || 'Votre prochain événement'}
                </Text>
                <Text className="mt-1 text-sm font-extrabold text-[#ff5f00]" numberOfLines={1}>
                  {date} · {location}
                </Text>
                <Text className="mt-1 text-xs text-neutral-500" numberOfLines={1}>
                  {group} · {participants || '0'} participants
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 bg-white px-5 pt-4"
        style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable className="h-14 items-center justify-center rounded-xl bg-[#ff5f00]" style={styles.publish} onPress={publish}>
          <Text className="text-sm font-extrabold text-white">Publier l'événement</Text>
        </Pressable>
      </View>
    </View>
  );
}

function FormInput({
  icon,
  label,
  value,
  onChangeText,
  keyboardType,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'number-pad';
}) {
  return (
    <View className="flex-1 rounded-2xl bg-neutral-100 px-4 py-3">
      <View className="mb-1 flex-row items-center">
        <MaterialIcons name={icon} size={18} color="#ff5f00" />
        <Text className="ml-2 text-xs font-extrabold uppercase text-neutral-500">{label}</Text>
      </View>
      <TextInput
        className="text-base font-semibold text-neutral-950"
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor="#949494"
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
  },
  cover: {
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  preview: {
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
  },
  footer: {
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
  },
  publish: {
    elevation: 4,
    shadowColor: '#ff5f00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
  },
});
