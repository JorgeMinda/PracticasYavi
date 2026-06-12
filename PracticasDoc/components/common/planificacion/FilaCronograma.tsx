
import { useState } from "react";
import { View, Text, Pressable, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CeldaCronograma from "./CeldaCronograma";
import { AreaPractica } from "../../../types/area";

interface Props {
  area: AreaPractica;
  indexFila: number;
  opcionesDisponibles: AreaPractica[];
  semanas: any[];
  resultados?: any[];
  onCambiarArea: (index: number, nuevaArea: AreaPractica) => void;
}

export default function FilaCronograma({
  area,
  indexFila,
  opcionesDisponibles,
  semanas,
  resultados = [],
  onCambiarArea,
}: Props) {
  const [selectorVisible, setSelectorVisible] = useState(false);

  return (
    <View className="flex-row border-b border-gray-200">
      {/* Selector interactivo de Área/Puesto */}
      <Pressable
        onPress={() => setSelectorVisible(true)}
        className="w-40 bg-blue-50/40 border-r border-gray-300 px-3 py-5 flex-row items-center justify-between active:bg-blue-100/60"
      >
        <Text className="font-semibold text-blue-900 text-base flex-1 pr-1" numberOfLines={1}>
          {area.nombre}
        </Text>
        <Ionicons name="chevron-down" size={16} color="#1e40af" />
      </Pressable>

      {/* Celdas de semanas */}
      {semanas.map((semana, index) => (
        <CeldaCronograma
          key={semana.numero || index}
          semana={semana}
          area={area}
          resultados={resultados}
        />
      ))}

      {/* Modal / Selector Dropdown Flotante */}
      <Modal visible={selectorVisible} transparent animationType="fade">
        <Pressable 
          className="flex-1 justify-center items-center bg-black/40" 
          onPress={() => setSelectorVisible(false)}
        >
          <View className="bg-white w-40 rounded-2xl shadow-xl max-h-80 overflow-hidden">
            <View className="bg-gray-50 px-4 py-3 border-b border-gray-100">
              <Text className="font-bold text-gray-700 text-center">Cambiar Puesto/Área</Text>
            </View>
            <FlatList
              data={opcionesDisponibles}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Pressable
                  className={`px-5 py-4 border-b border-gray-100 flex-row items-center justify-between active:bg-gray-50 ${
                    item.id === area.id ? "bg-blue-50/50" : ""
                  }`}
                  onPress={() => {
                    onCambiarArea(indexFila, item);
                    setSelectorVisible(false);
                  }}
                >
                  <Text className={`text-base ${item.id === area.id ? "text-blue-600 font-bold" : "text-gray-800"}`}>
                    {item.nombre}
                  </Text>
                  {item.id === area.id && <Ionicons name="checkmark" size={18} color="#2563eb" />}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}