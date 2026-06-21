import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { prototypeImages } from '@/constants/prototype-images';

const threads = [
  {
    name: 'Sarah M.',
    message: "On se voit au parc tout à l'heure ?",
    time: '10:30',
    unread: true,
    avatar: prototypeImages.avatars[5],
  },
  {
    name: 'Lomé Food Fanatics',
    message: "Marc : J'apporte les boissons !",
    time: 'Hier',
    group: true,
    avatars: prototypeImages.avatars.slice(0, 3),
  },
  {
    name: 'David K.',
    message: "C'était super sympa, à refaire.",
    time: 'Lun.',
    avatar: prototypeImages.avatars[6],
  },
];

export default function MessagesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <View
        className="flex-row items-center justify-between bg-white px-5 pb-4"
        style={{ paddingTop: insets.top + 16 }}>
        <Text className="text-[40px] font-extrabold leading-[48px] tracking-tight text-neutral-950">Messages</Text>
        <View className="flex-row gap-2">
          <Pressable className="h-11 w-11 items-center justify-center rounded-full" hitSlop={8}>
            <MaterialIcons name="search" size={28} color="#171717" />
          </Pressable>
          <Pressable className="h-11 w-11 items-center justify-center rounded-full" hitSlop={8}>
            <MaterialIcons name="edit-square" size={27} color="#171717" />
          </Pressable>
        </View>
      </View>

      <View className="border-b border-neutral-200 px-5 pb-4">
        <View className="flex-row gap-8">
          <View className="border-b-2 border-[#ff5f00] pb-1">
            <Text className="text-2xl font-extrabold text-neutral-950">Discussions</Text>
          </View>
          <View className="border-b-2 border-transparent pb-1">
            <Text className="text-2xl font-extrabold text-neutral-500">Groupes</Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="px-5 py-4"
        showsVerticalScrollIndicator={false}>
        {threads.map((thread) => (
          <ThreadRow key={thread.name} thread={thread} />
        ))}
      </ScrollView>
    </View>
  );
}

type Thread = (typeof threads)[number];

function ThreadRow({ thread }: { thread: Thread }) {
  const content = (
    <Pressable className="flex-row items-center justify-between rounded-xl px-2 py-4">
      <View className="flex-1 flex-row items-center overflow-hidden">
        {thread.group ? (
          <GroupAvatar avatars={thread.avatars ?? prototypeImages.avatars.slice(0, 3)} />
        ) : (
          <SingleAvatar source={thread.avatar ?? prototypeImages.avatars[0]} />
        )}

        <View className="ml-4 flex-1">
          <Text className="text-lg font-extrabold leading-6 text-neutral-950" numberOfLines={1}>
            {thread.name}
          </Text>
          <Text
            className={`mt-1 text-base leading-6 ${thread.unread ? 'font-extrabold text-neutral-950' : 'text-neutral-500'}`}
            numberOfLines={1}>
            {thread.message}
          </Text>
        </View>
      </View>

      <View className="ml-4 items-end">
        <Text className={`text-xs font-semibold ${thread.unread ? 'text-[#ff5f00]' : 'text-neutral-500'}`}>
          {thread.time}
        </Text>
        {thread.unread ? <View className="mt-2 h-3 w-3 rounded-full bg-[#ff5f00]" /> : null}
      </View>
    </Pressable>
  );

  return thread.name === 'Sarah M.' ? (
    <Link href="/chat" asChild>
      {content}
    </Link>
  ) : (
    content
  );
}

function SingleAvatar({ source }: { source: (typeof prototypeImages.avatars)[number] }) {
  return (
    <View className="h-14 w-14 overflow-hidden rounded-full bg-neutral-100" style={styles.avatarShadow}>
      <Image source={source} className="h-full w-full" contentFit="cover" />
    </View>
  );
}

function GroupAvatar({ avatars }: { avatars: typeof prototypeImages.avatars }) {
  return (
    <View className="h-14 w-14 flex-row flex-wrap overflow-hidden rounded-full bg-neutral-100" style={styles.avatarShadow}>
      <Image source={avatars[0]} className="h-1/2 w-1/2" contentFit="cover" />
      <Image source={avatars[1]} className="h-1/2 w-1/2" contentFit="cover" />
      <Image source={avatars[2]} className="h-1/2 w-full" contentFit="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarShadow: {
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
});
