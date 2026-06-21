import { Image } from 'expo-image';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { prototypeImages } from '@/constants/prototype-images';

const messages = [
  {
    text: "Coucou ! Tu viens toujours à l'événement de cet aprèm ?",
    time: '10:28',
    mine: false,
  },
  {
    text: "Oui bien sûr ! Je finis mon code et j'arrive. 🚀",
    time: '10:29',
    mine: true,
  },
  {
    text: "Super ! On se voit au parc tout à l'heure ?",
    time: '10:30',
    mine: false,
  },
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <View
        className="flex-row items-center justify-between bg-white/95 px-5 pb-4"
        style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View className="flex-1 flex-row items-center">
          <Pressable
            className="-ml-1 h-10 w-10 items-center justify-center rounded-full"
            hitSlop={10}
            onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={25} color="#171717" />
          </Pressable>

          <View className="ml-3 flex-row items-center">
            <View className="h-10 w-10 overflow-hidden rounded-full bg-neutral-100" style={styles.avatar}>
              <Image source={prototypeImages.avatars[5]} className="h-full w-full" contentFit="cover" />
            </View>
            <View className="ml-3">
              <Text className="text-sm font-extrabold text-neutral-950">Sarah M.</Text>
              <Text className="mt-0.5 text-xs font-semibold text-[#ff5f00]">En ligne</Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-5">
          <Pressable hitSlop={10}>
            <MaterialIcons name="call" size={24} color="#737373" />
          </Pressable>
          <Pressable hitSlop={10}>
            <MaterialIcons name="videocam" size={26} color="#737373" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="gap-6 px-5 py-8"
        contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}
        showsVerticalScrollIndicator={false}>
        <View className="self-center rounded-full bg-neutral-100 px-4 py-1">
          <Text className="text-xs font-semibold text-neutral-500">Aujourd&apos;hui</Text>
        </View>

        {messages.map((message) => (
          <MessageBubble key={`${message.time}-${message.text}`} message={message} />
        ))}
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 flex-row items-center gap-3 border-t border-neutral-200 bg-white px-5 pt-3"
        style={[styles.inputBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable className="-ml-2 h-10 w-10 items-center justify-center rounded-full" hitSlop={10}>
          <MaterialIcons name="add" size={25} color="#737373" />
        </Pressable>
        <View className="min-h-12 flex-1 justify-center rounded-full bg-neutral-100 px-4">
          <TextInput
            className="text-base text-neutral-950"
            placeholder="Votre message..."
            placeholderTextColor="#737373"
          />
        </View>
        <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-[#ff5f00]" style={styles.send}>
          <MaterialIcons name="send" size={23} color="#ffffff" style={{ marginLeft: 2 }} />
        </Pressable>
      </View>
    </View>
  );
}

type ChatMessage = (typeof messages)[number];

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.mine) {
    return (
      <View className="max-w-[85%] self-end">
        <View className="rounded-2xl rounded-br-sm bg-[#ff5f00] px-4 py-3" style={styles.sentBubble}>
          <Text className="text-base leading-6 text-white">{message.text}</Text>
        </View>
        <View className="mt-1 flex-row items-center justify-end gap-1">
          <Text className="text-xs font-semibold text-neutral-500">{message.time}</Text>
          <MaterialIcons name="done-all" size={16} color="#ff5f00" />
        </View>
      </View>
    );
  }

  return (
    <View className="max-w-[85%] self-start">
      <View className="rounded-2xl rounded-bl-sm bg-neutral-100 px-4 py-3" style={styles.receivedBubble}>
        <Text className="text-base leading-6 text-neutral-950">{message.text}</Text>
      </View>
      <Text className="ml-1 mt-1 text-xs font-semibold text-neutral-500">{message.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 22,
  },
  avatar: {
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  sentBubble: {
    elevation: 2,
    shadowColor: '#ff5f00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
  },
  receivedBubble: {
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  inputBar: {
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
  },
  send: {
    elevation: 3,
    shadowColor: '#ff5f00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
});
