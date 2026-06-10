import React, { useState } from "react";
import { View, Text, Pressable, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Resultado {
  id: number | string;
  descripcion: string;
}

interface Props {
  resultados: Resultado[];
  onAgregar: () => void;
  onEliminar: (ids: (number | string)[]) => void;
}

export default function ResultadoTable({
  resultados,
  onAgregar,
  onEliminar,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<(number | string)[]>([]);

  const toggleSelect = (id: number | string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === resultados.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(resultados.map((item) => item.id));
    }
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return;

    const confirmar = window.confirm(
      `¿Estás seguro de eliminar ${selectedIds.length} resultado(s) de aprendizaje?`
    );

    if (confirmar) {
      onEliminar(selectedIds);
      setSelectedIds([]);
    }
  };

  return (
    <View className="bg-white mx-4 mt-6 rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header Corregido: Permite que los elementos se envuelvan fluidamente si falta espacio */}
      <View className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex-row flex-wrap justify-between items-center gap-y-3">
        <View className="flex-1 min-w-[160px]">
          <Text className="font-bold text-xl text-gray-900 leading-tight">
            Resultados de Aprendizaje
          </Text>
          <Text className="text-gray-500 text-sm mt-0.5">
            {resultados.length} agregados
          </Text>
        </View>

        {/* Contenedor de Botones optimizado y alineado */}
        <View className="flex-row items-center gap-2 flex-wrap justify-end">
          {selectedIds.length > 0 && (
            <Pressable
              className="bg-red-600 px-3.5 py-2 rounded-xl flex-row items-center active:bg-red-700"
              onPress={handleDelete}
            >
              <Ionicons name="trash-outline" size={18} color="white" />
              <Text className="text-white font-semibold ml-1.5 text-sm">
                Eliminar ({selectedIds.length})
              </Text>
            </Pressable>
          )}

          <Pressable
            className="bg-emerald-600 px-3.5 py-2 rounded-xl flex-row items-center active:bg-emerald-700"
            onPress={onAgregar}
          >
            <Ionicons name="add" size={18} color="white" />
            <Text className="text-white font-semibold ml-1 text-sm">Agregar</Text>
          </Pressable>
        </View>
      </View>

      {/* Select All */}
      {resultados.length > 0 && (
        <Pressable
          onPress={toggleSelectAll}
          className="flex-row items-center px-5 py-3 bg-white border-b border-gray-100 active:bg-gray-50"
        >
          <View
            className={`w-6 h-6 border-2 rounded-lg mr-3 items-center justify-center ${
              selectedIds.length === resultados.length
                ? "bg-blue-600 border-blue-600"
                : "border-gray-300"
            }`}
          >
            {selectedIds.length === resultados.length && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
          <Text className="text-gray-700 font-medium">Seleccionar todos</Text>
        </Pressable>
      )}

      {/* Lista */}
      <FlatList
        data={resultados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <Pressable
              onPress={() => toggleSelect(item.id)}
              className={`flex-row items-center px-5 py-4 border-b border-gray-100 active:bg-gray-50 ${
                isSelected ? "bg-blue-50" : "bg-white"
              }`}
            >
              {/* Checkbox */}
              <View
                className={`w-7 h-7 border-2 rounded-xl mr-4 items-center justify-center transition-all ${
                  isSelected
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-300"
                }`}
              >
                {isSelected && <Ionicons name="checkmark" size={18} color="white" />}
              </View>

              {/* Número */}
              <View className="w-8">
                <Text className="text-gray-400 font-medium text-lg">
                  {index + 1}
                </Text>
              </View>

              {/* Descripción */}
              <Text className="flex-1 text-gray-800 leading-snug pr-4">
                {item.descripcion}
              </Text>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View className="py-16 items-center">
            <Ionicons name="document-text-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-400 mt-4 text-lg font-medium">
              No hay resultados agregados
            </Text>
            <Text className="text-gray-400 text-center mt-1 px-10">
              Presiona "Agregar" para incluir resultados de aprendizaje
            </Text>
          </View>
        }
      />
    </View>
  );
}