import React from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  resultados: Array<{ id: number | string; descripcion: string }>;
  onClose: () => void;
  onSelect: (item: any) => void;
}

export default function ModalResultado({
  visible,
  resultados,
  onClose,
  onSelect,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 justify-center items-center bg-black/70">
        <View className="bg-white w-11/12 max-w-lg rounded-2xl shadow-xl overflow-hidden">
          {/* Header del Modal */}
          <View className="px-6 py-5 border-b border-gray-100">
            <Text className="text-2xl font-bold text-gray-900">
              Resultados de Aprendizaje
            </Text>
            <Text className="text-gray-500 mt-1">
              Selecciona uno para agregar
            </Text>
          </View>

          {/* Lista */}
          <FlatList
            data={resultados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                className="px-6 py-4 border-b border-gray-100 active:bg-gray-50"
                onPress={() => onSelect(item)}
              >
                <View className="flex-row items-start">
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="#10b981"
                    style={{ marginRight: 12, marginTop: 2 }}
                  />
                  <Text className="flex-1 text-gray-800 leading-snug">
                    {item.descripcion}
                  </Text>
                </View>
              </Pressable>
            )}
            ListEmptyComponent={
              <View className="py-12 items-center">
                <Text className="text-gray-400">No hay resultados disponibles</Text>
              </View>
            }
          />

          {/* Botón Cerrar */}
          <View className="p-4 border-t border-gray-100">
            <Pressable
              className="bg-gray-200 py-3.5 rounded-xl active:bg-gray-300"
              onPress={onClose}
            >
              <Text className="text-gray-700 font-semibold text-center text-base">
                Cerrar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}