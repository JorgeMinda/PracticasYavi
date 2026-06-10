import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  fechaInicio: Date;
  setFechaInicio: (fecha: Date) => void;
  onGenerar: () => void;
}

export default function PlanificacionHeader({
  fechaInicio,
  setFechaInicio,
  onGenerar,
}: Props) {
  const [showPicker, setShowPicker] = useState(false);

  const formattedDate = fechaInicio.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View className="bg-white mx-4 mt-4 rounded-2xl shadow-lg p-6 border border-gray-100">
      <Text className="text-3xl font-bold text-gray-900">
        Planificación de Prácticas
      </Text>

      <Text className="mt-6 mb-2 text-lg font-semibold text-gray-700">
        Fecha de Inicio
      </Text>

      <View className="flex-row items-center gap-3">
        <Pressable
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 active:bg-gray-100"
          onPress={() => setShowPicker(true)}
        >
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={24} color="#4B5563" />
            <Text className="ml-3 text-base text-gray-800 font-medium">
              {formattedDate}
            </Text>
          </View>
        </Pressable>

        <Pressable
          className="bg-blue-600 px-8 py-4 rounded-xl active:bg-blue-700"
          onPress={onGenerar}
        >
          <Text className="text-white font-semibold text-base">Generar</Text>
        </Pressable>
      </View>

      {showPicker && (
        <DateTimePicker
          value={fechaInicio}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setFechaInicio(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}