
import { useState, useEffect } from "react";
import { ScrollView, Alert, View } from "react-native";

import { getLearningResults } from "../services/dataService";
import { generarSemanas } from "../utils/generarSemanas";

import PlanificacionHeader from "../components/common/planificacion/PlanificacionHeader";
import ResultadoTable from "../components/common/planificacion/ResultadoTable";
import TablaCronograma from "../components/common/planificacion/TablaCronograma";
import ModalResultado from "../components/common/planificacion/ModalResultado";

import { ResultadoAprendizaje } from "../types/resultado";
import { AreaPractica } from "../types/area";
import { Semana } from "../types/semana";

export default function PlanificacionScreen() {
  const [fechaInicio, setFechaInicio] = useState<Date>(new Date());

  const [semanas, setSemanas] = useState<Semana[]>([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [resultados, setResultados] = useState<ResultadoAprendizaje[]>([]);

  const [resultadosDisponibles, setResultadosDisponibles] =
    useState<ResultadoAprendizaje[]>([]);

  const [areas] = useState<AreaPractica[]>([
    { id: 1, nombre: "TICS" },
    { id: 2, nombre: "DESARROLLO" },
    { id: 3, nombre: "INNOVACIÓN" },
  ]);

  useEffect(() => {
    cargarResultados();
  }, []);

  const cargarResultados = async () => {
    try {
      const data = await getLearningResults();
      setResultadosDisponibles(data);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "No se pudieron cargar los resultados de aprendizaje."
      );
    }
  };

  const agregarResultado = (resultado: ResultadoAprendizaje) => {
    if (resultados.some((r) => r.id === resultado.id)) {
      Alert.alert("Aviso", "Este resultado ya fue agregado");
      return;
    }

    const descLower = resultado.descripcion.toLowerCase();

    let areaId = 1;

    if (descLower.includes("móvil") || descLower.includes("nat")) {
      areaId = 2;
    } else if (
      descLower.includes("ágil") ||
      descLower.includes("innov")
    ) {
      areaId = 3;
    }

    const resultadoConArea = {
      ...resultado,
      areaId,
      semanasNecesarias: 4,
    };

    setResultados((prev) => [...prev, resultadoConArea]);

    setModalVisible(false);
  };

  const eliminarResultados = (ids: (number | string)[]) => {
    setResultados((prev) =>
      prev.filter((r) => !ids.includes(r.id))
    );
  };

  const generarCalendario = async () => {
    try {
      const nuevasSemanas = await generarSemanas(fechaInicio);
      setSemanas(nuevasSemanas);
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo generar el cronograma."
      );
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <View className="space-y-4 px-4 pt-4">
        <PlanificacionHeader
          fechaInicio={fechaInicio}
          setFechaInicio={setFechaInicio}
          onGenerar={generarCalendario}
        />

        <View className="flex-row space-x-4 w-full">
          <View className="flex-[6] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <TablaCronograma
              areas={areas}
              semanas={semanas}
              resultados={resultados}
            />
          </View>

          <View className="flex-[4] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ResultadoTable
              resultados={resultados}
              onAgregar={() => setModalVisible(true)}
              onEliminar={eliminarResultados}
            />
          </View>
        </View>
      </View>

      <ModalResultado
        visible={modalVisible}
        resultados={resultadosDisponibles}
        onClose={() => setModalVisible(false)}
        onSelect={agregarResultado}
      />
    </ScrollView>
  );
}

