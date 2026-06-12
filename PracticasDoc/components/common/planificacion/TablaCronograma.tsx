import { ScrollView, View, Text } from "react-native";
import FilaCronograma from "./FilaCronograma";
import { AreaPractica } from "../../../types/area";

interface Semana {
  numero: number;
  rango: string;
}

interface Props {
  areas: AreaPractica[];
  opcionesDisponibles: AreaPractica[];
  semanas: Semana[];
  resultados: any[];
  onCambiarArea: (index: number, nuevaArea: AreaPractica) => void;
}

export default function TablaCronograma({
  areas,
  opcionesDisponibles,
  semanas,
  resultados = [],
  onCambiarArea,
}: Props) {
  if (semanas.length === 0) {
    return (
      <View className="mx-4 mt-6 bg-white rounded-2xl p-8 items-center border border-gray-100">
        <Text className="text-gray-500 text-lg text-center">
          Presiona el botón "Generar" para crear el cronograma
        </Text>
      </View>
    );
  }

  return (
    <View className="mx-4 mt-6">
      <Text className="text-2xl font-bold text-gray-900 mb-4 px-2">
        Cronograma de Rotación
      </Text>
      
      <View className="flex-row justify-between items-center px-1 mb-2">
        <Text className="font-semibold text-gray-700">
          Total semanas: {semanas.length}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
      >
        <View>
          {/* Header */}
          <View className="flex-row bg-gray-100 border-b-2 border-gray-300">
            <View className="w-40 px-4 py-4 border-r border-gray-300">
              <Text className="font-bold text-gray-800">Área / Puesto</Text>
            </View>

            {semanas.map((semana) => (
              <View
                key={semana.numero}
                className="w-20 px-2 py-3 border-r border-gray-300 items-center bg-white"
              >
                <Text className="font-bold text-sm text-gray-900">S{semana.numero}</Text>
                <Text className="text-[10px] text-gray-600 text-center leading-tight">
                  {semana.rango}
                </Text>
              </View>
            ))}
          </View>

          {/* Filas interactivos */}
          {areas.map((area, index) => (
            <FilaCronograma
              key={`${area.id}-${index}`}
              area={area}
              indexFila={index}
              opcionesDisponibles={opcionesDisponibles}
              semanas={semanas}
              resultados={resultados}
              onCambiarArea={onCambiarArea}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}