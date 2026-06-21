import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <View className="flex-1 justify-center">
        <View className="mb-8 items-center">
          <Text className="mb-2 text-[40px] font-extrabold leading-[48px] tracking-tight text-[#ff5f00]">
            Toi & Moi
          </Text>
          <Text className="text-center text-lg leading-7 text-neutral-600">Votre vie sociale commence ici.</Text>
        </View>

        <View className="mb-2 gap-4">
          <InputField icon="mail" placeholder="Adresse e-mail" keyboardType="email-address" />
          <InputField icon="lock" placeholder="Mot de passe" secureTextEntry />
        </View>

        <View className="mb-8 mt-3 items-end">
          <Pressable hitSlop={8}>
            <Text className="text-sm font-extrabold text-neutral-600">Mot de passe oublié ?</Text>
          </Pressable>
        </View>

        <Link href="/onboarding" asChild>
          <Pressable className="mb-8 h-14 items-center justify-center rounded-full bg-[#ff5f00]" style={styles.primaryButton}>
            <Text className="text-sm font-extrabold text-white">Se connecter</Text>
          </Pressable>
        </Link>

        <View className="mb-8 flex-row items-center">
          <View className="h-px flex-1 bg-neutral-200" />
          <Text className="mx-4 text-base text-neutral-600">ou</Text>
          <View className="h-px flex-1 bg-neutral-200" />
        </View>

        <View className="mb-12 gap-4">
          <SocialButton icon="account-circle" label="Continuer avec Google" />
          <SocialButton icon="phone-iphone" label="Continuer avec Apple" />
        </View>

        <View className="items-center">
          <Text className="text-base text-neutral-600">
            Pas encore de compte ? <Text className="font-extrabold text-[#ff5f00]">S'inscrire</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function InputField({
  icon,
  placeholder,
  keyboardType,
  secureTextEntry,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  placeholder: string;
  keyboardType?: 'email-address';
  secureTextEntry?: boolean;
}) {
  return (
    <View className="h-14 flex-row items-center rounded-full bg-neutral-100 px-4">
      <MaterialIcons name={icon} size={23} color="#737373" />
      <TextInput
        className="ml-3 flex-1 text-base text-neutral-950"
        placeholder={placeholder}
        placeholderTextColor="#737373"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
}

function SocialButton({ icon, label }: { icon: keyof typeof MaterialIcons.glyphMap; label: string }) {
  return (
    <Pressable className="h-14 flex-row items-center justify-center rounded-full border border-neutral-200 bg-white">
      <MaterialIcons name={icon} size={23} color="#737373" />
      <Text className="ml-2 text-sm font-extrabold text-neutral-950">{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    elevation: 4,
    shadowColor: '#ff5f00',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
  },
});
