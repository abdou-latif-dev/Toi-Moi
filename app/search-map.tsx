import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import {
  type DimensionValue,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const dateFilters = ['Aujourd’hui', 'Ce week-end', 'Choisir...'];
const priceFilters = ['Tous', 'Gratuit', 'Payant'];

export default function SearchMapScreen() {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const sheetHeight = Math.min(460, Math.max(380, height * 0.48));

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 bg-[#f9f9f9]">
        <MapPattern />

        <View className="absolute left-5 right-5 z-10" style={{ top: insets.top + 12 }}>
          <View className="h-14 flex-row items-center rounded-full bg-white px-3" style={styles.searchBar}>
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full"
              hitSlop={10}
              onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color="#171717" />
            </Pressable>
            <TextInput
              className="mx-3 flex-1 text-lg text-neutral-950"
              value="Lomé, Togo"
              editable={false}
            />
            <Pressable className="h-10 w-10 items-center justify-center rounded-full" hitSlop={10}>
              <MaterialIcons name="close" size={24} color="#737373" />
            </Pressable>
          </View>
        </View>

        <MapPin top="34%" left="24%" label="Gratuit" icon="location-on" />
        <MapPin top="49%" left="70%" label="Dîner" icon="restaurant" />
        <MapPin top="72%" left="45%" icon="event" />
      </View>

      <View
        className="absolute bottom-0 left-0 right-0 rounded-t-[28px] bg-white"
        style={[styles.sheet, { height: sheetHeight, paddingBottom: insets.bottom }]}>
        <View className="items-center py-4">
          <View className="h-1.5 w-12 rounded-full bg-neutral-200" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5"
          contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
          showsVerticalScrollIndicator={false}>
          <FilterSection title="Date">
            {dateFilters.map((filter, index) => (
              <FilterChip key={filter} label={filter} active={index === 0} icon={filter === 'Choisir...' ? 'calendar-today' : undefined} />
            ))}
          </FilterSection>

          <FilterSection title="Prix">
            {priceFilters.map((filter, index) => (
              <FilterChip key={filter} label={filter} active={index === 0} />
            ))}
          </FilterSection>

          <View className="mb-7">
            <Text className="mb-4 text-2xl font-extrabold text-neutral-950">Distance: 10 km</Text>
            <View className="relative py-4">
              <View className="h-1.5 rounded-full bg-neutral-200" />
              <View className="absolute left-0 top-4 h-1.5 w-[40%] rounded-full bg-[#ff5f00]" />
              <View className="absolute left-[40%] top-1.5 h-6 w-6 -translate-x-3 rounded-full border-2 border-white bg-[#ff5f00]" style={styles.thumb} />
            </View>
          </View>
        </ScrollView>

        <View
          className="absolute bottom-0 left-0 right-0 bg-white px-5 pt-3"
          style={{ paddingBottom: insets.bottom + 16 }}>
          <Pressable className="h-14 items-center justify-center rounded-2xl bg-[#ff5f00]" style={styles.cta}>
            <Text className="text-sm font-extrabold text-white">Afficher 12 événements</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function MapPattern() {
  return (
    <View className="absolute inset-0 overflow-hidden bg-[#f6f6f6]">
      {Array.from({ length: 9 }).map((_, index) => (
        <View
          key={`v-${index}`}
          className="absolute top-0 h-full w-px bg-neutral-200"
          style={{ left: `${index * 12.5}%`, opacity: 0.8 }}
        />
      ))}
      {Array.from({ length: 12 }).map((_, index) => (
        <View
          key={`h-${index}`}
          className="absolute left-0 h-px w-full bg-neutral-200"
          style={{ top: `${index * 9}%`, opacity: 0.8 }}
        />
      ))}
      <View className="absolute -left-16 top-36 h-44 w-[120%] rotate-[-10deg] rounded-full bg-neutral-200/70" />
      <View className="absolute -right-20 top-64 h-56 w-[110%] rotate-[18deg] rounded-full bg-neutral-100" />
      <View className="absolute left-12 top-28 h-32 w-44 rounded-[36px] bg-white/80" />
      <View className="absolute right-10 top-52 h-40 w-36 rounded-[36px] bg-white/80" />
    </View>
  );
}

function MapPin({
  top,
  left,
  label,
  icon,
}: {
  top: DimensionValue;
  left: DimensionValue;
  label?: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}) {
  return (
    <View className="absolute items-center" style={{ top, left, transform: [{ translateX: -24 }, { translateY: -48 }] }}>
      {label ? (
        <View className="mb-1 rounded-full bg-white px-3 py-1" style={styles.pinLabel}>
          <Text className="text-sm font-extrabold text-neutral-950">{label}</Text>
        </View>
      ) : null}
      <View className="h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-[#ff5f00]" style={styles.pin}>
        <MaterialIcons name={icon} size={24} color="#ffffff" />
      </View>
      <View className="-mt-2 h-4 w-4 rotate-45 border-b-2 border-r-2 border-white bg-[#ff5f00]" />
    </View>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mb-7">
      <Text className="mb-4 text-2xl font-extrabold text-neutral-950">{title}</Text>
      <View className="flex-row flex-wrap gap-2">{children}</View>
    </View>
  );
}

function FilterChip({
  label,
  active,
  icon,
}: {
  label: string;
  active?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap;
}) {
  return (
    <Pressable className={`flex-row items-center gap-1 rounded-full px-5 py-2.5 ${active ? 'bg-[#ff5f00]' : 'border border-neutral-200 bg-white'}`}>
      <Text className={`text-sm font-extrabold ${active ? 'text-white' : 'text-neutral-500'}`}>{label}</Text>
      {icon ? <MaterialIcons name={icon} size={18} color={active ? '#ffffff' : '#737373'} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
  },
  sheet: {
    elevation: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
  },
  pin: {
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
  },
  pinLabel: {
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  thumb: {
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  cta: {
    elevation: 4,
    shadowColor: '#ff5f00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
  },
});
