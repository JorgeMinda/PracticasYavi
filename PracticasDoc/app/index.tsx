import { router } from "expo-router";
import { View, Text } from "react-native";
import AppButton from "../components/common/AppButton";

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center">

      <Text className="text-3xl mb-8">

        Sistema de Planificación

      </Text>

      <AppButton
        title="Entrar"
        onPress={() => router.push("/planificacion")}
      />

    </View>
  );
}