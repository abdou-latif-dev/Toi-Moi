import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const interests = [
  { id: 'tech', emoji: '💻', label: 'Technologie' },
  { id: 'culture', emoji: '🎨', label: 'Art & Culture' },
  { id: 'sport', emoji: '🏃', label: 'Sport & Fitness' },
  { id: 'food', emoji: '🍔', label: 'Gastronomie' },
  { id: 'music', emoji: '🎵', label: 'Musique Live' },
  { id: 'photo', emoji: '📸', label: 'Photographie' },
  { id: 'travel', emoji: '🌍', label: 'Voyages' },
  { id: 'fashion', emoji: '👗', label: 'Mode' },
  { id: 'wellness', emoji: '🧘', label: 'Bien-être' },
  { id: 'gaming', emoji: '🎮', label: 'Gaming' },
  { id: 'books', emoji: '📚', label: 'Littérature' },
  { id: 'afterwork', emoji: '🍷', label: 'Afterwork' },
];

const initialSelection = ['tech', 'culture', 'sport'];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(initialSelection);

  const canContinue = selected.length >= 3;

  const toggleInterest = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="bg-white px-5 pb-3" style={{ paddingTop: insets.top + 8 }}>
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full"
          hitSlop={10}
          onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={25} color="#171717" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="px-5"
        contentContainerStyle={{ paddingBottom: insets.bottom + 124 }}
        showsVerticalScrollIndicator={false}>
        <View className="mb-8 mt-7">
          <Text className="mb-2 text-[32px] font-extrabold leading-10 tracking-tight text-neutral-950">
            Qu&apos;est-ce qui vous passionne ?
          </Text>
          <Text className="text-base leading-6 text-neutral-500">
            Sélectionnez au moins 3 centres d&apos;intérêt pour personnaliser votre expérience.
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-2">
          {interests.map((interest) => {
            const isSelected = selected.includes(interest.id);

            return (
              <Pressable
                key={interest.id}
                onPress={() => toggleInterest(interest.id)}
                className={`flex-row items-center gap-1 rounded-full px-4 py-2.5 ${
                  isSelected ? 'bg-[#ff5f00]' : 'border border-neutral-200 bg-white'
                }`}
                style={isSelected ? styles.selectedChip : undefined}>
                <Text className="text-base">{interest.emoji}</Text>
                <Text className={`text-sm font-extrabold ${isSelected ? 'text-white' : 'text-neutral-950'}`}>
                  {interest.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 bg-white/95 px-5 pt-4"
        style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable
          onPress={() => router.replace('/(tabs)')}
          className={`h-14 items-center justify-center rounded-full bg-[#ff5f00] ${canContinue ? '' : 'opacity-50'}`}
          disabled={!canContinue}
          style={styles.cta}>
          <Text className="text-sm font-extrabold text-white">Continuer ({selected.length} sélectionnés)</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedChip: {
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  footer: {
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
  },
  cta: {
    elevation: 4,
    shadowColor: '#ff5f00',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
});
