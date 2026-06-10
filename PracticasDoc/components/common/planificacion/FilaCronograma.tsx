import { View, Text } from "react-native";
import CeldaCronograma from "./CeldaCronograma";

interface Props {
  area: { id: number | string; nombre: string };
  semanas: any[];
  resultados?: any[];        // ← Agregado
}

export default function FilaCronograma({
  area,
  semanas,
  resultados = [],         // ← Default
}: Props) {
  return (
    <View className="flex-row border-b border-gray-200">
      {/* Columna del Área */}
      <View className="w-40 bg-gray-50 border-r border-gray-300 px-4 py-5 justify-center">
        <Text className="font-semibold text-gray-800 text-base">
          {area.nombre}
        </Text>
      </View>

      {/* Celdas de semanas */}
      {semanas.map((semana, index) => (
        <CeldaCronograma
          key={semana.numero || index}
          semana={semana}
          area={area}
          resultados={resultados}     // ← Muy importante
        />
      ))}
    </View>
  );
}