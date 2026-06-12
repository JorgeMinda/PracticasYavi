import { Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  semana: { numero: number };
  area: { id: number | string; nombre: string };
  resultados?: Array<{
    areaId?: number | string;
    semanasNecesarias?: number;
  }>;
}

export default function CeldaCronograma({
  semana,
  area,
  resultados = [],
}: Props) {
  // 1. Contamos el total de observaciones/objetivos agregados globalmente en toda la aplicación
  const totalObservacionesGlobal = resultados.length;

  // 2. Cada observación seleccionada activa exactamente 4 casillas en total
  const casillasTotalesAPintar = totalObservacionesGlobal * 4;

  // 3. Mapeamos de forma estricta el orden de tus filas (de arriba hacia abajo)
  // tics = fila 1, desarrollo = fila 2, innovacion = fila 3
  const ordenFilas: Record<string, number> = {
    "4": 0, // Tics (Fila 1)
    "3": 1, // Desarrollo (Fila 2)
    "5": 2, // Innovación (Fila 3)
  };

  const idAreaStr = String(area.id).trim();
  const indiceFila = ordenFilas[idAreaStr] !== undefined ? ordenFilas[idAreaStr] : 0;

  const numSemana = Number(semana.numero); // Columnas de 1 a 8

  // 4. Calculamos la posición lineal global de ESTA celda específica en el tablero
  // Fila 0 (Tics): Semanas 1 a 8 -> Posiciones 1 a 8
  // Fila 1 (Desarrollo): Semanas 1 a 8 -> Posiciones 9 a 16
  // Fila 2 (Innovación): Semanas 1 a 8 -> Posiciones 17 a 24
  const posicionGlobalCelda = (indiceFila * 8) + numSemana;

  // 📋 LÓGICA SECUENCIAL GLOBAL:
  // La celda se activa si su posición en el tablero es menor o igual al cupo acumulado por las observaciones
  const estaActivo = posicionGlobalCelda <= casillasTotalesAPintar;

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