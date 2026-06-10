import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  semana: { numero: number };
  area: { id: number | string; nombre: string };
  resultados?: Array<{ 
    areaId?: number; 
    semanasNecesarias?: number 
  }>;
}

export default function CeldaCronograma({ 
  semana, 
  area, 
  resultados = [] 
}: Props) {
  
  // Lógica de marcado automático
  const resultadosDeEstaArea = resultados.filter(
    (r) => Number(r.areaId) === Number(area.id)
  );

  const totalSemanasAsignadas = resultadosDeEstaArea.reduce(
    (sum, r) => sum + (r.semanasNecesarias || 4),
    0
  );

  const estaActivo = semana.numero <= totalSemanasAsignadas;

  return (
    <Pressable
      className={`w-20 border-r border-gray-200 py-6 items-center justify-center active:bg-gray-100
        ${estaActivo ? "bg-emerald-50" : "bg-white"}`}
    >
      {estaActivo ? (
        <Ionicons name="checkmark-circle" size={32} color="#10b981" />
      ) : (
        <Text className="text-3xl text-gray-200">–</Text>
      )}
    </Pressable>
  );
}