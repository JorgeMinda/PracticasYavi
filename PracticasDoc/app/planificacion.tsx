import { useState, useEffect } from "react";
import { ScrollView, Alert, View, Platform, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { getLearningResults } from "../services/dataService";
import { generarSemanas } from "../utils/generarSemanas";

import PlanificacionHeader from "../components/common/planificacion/PlanificacionHeader";
import ResultadoTable from "../components/common/planificacion/ResultadoTable";
import TablaCronograma from "../components/common/planificacion/TablaCronograma";
import ModalResultado from "../components/common/planificacion/ModalResultado";

import { ResultadoAprendizaje } from "../types/resultado";
import { Semana } from "../types/semana";
import { AreaPractica } from "../types/area";

const OPCIONES_AREAS: AreaPractica[] = [
  { id: 1, nombre: "Diseño" },
  { id: 2, nombre: "Investigación" },
  { id: 3, nombre: "Desarrollo" },
  { id: 4, nombre: "Tics" }, 
  { id: 5, nombre: "Innovación" },
];

export default function PlanificacionScreen() {
  const [fechaInicio, setFechaInicio] = useState<Date>(new Date());
  const [semanas, setSemanas] = useState<Semana[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [resultados, setResultados] = useState<ResultadoAprendizaje[]>([]);
  const [resultadosDisponibles, setResultadosDisponibles] = useState<ResultadoAprendizaje[]>([]);

  const [filasCronograma, setFilasCronograma] = useState<AreaPractica[]>([
    { id: 4, nombre: "Tics" },
    { id: 3, nombre: "Desarrollo" },
    { id: 5, nombre: "Innovación" },
  ]);

  useEffect(() => {
    cargarResultados();
  }, []);

  const cargarResultados = async () => {
    try {
      console.log("=== INICIANDO PETICIÓN A SUPABASE ===");
      const data = await getLearningResults();
      
      const datosMapeados = (data || []).map((item: any) => ({
        ...item,
        descripcion: item.result || "Sin descripción disponible",
      }));

      setResultadosDisponibles(datosMapeados);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudieron cargar los resultados de aprendizaje.");
    }
  };

  const cambiarAreaDeFila = (indexFila: number, nuevaArea: AreaPractica) => {
    const areaDuplicada = filasCronograma.some(
      (fila, idx) => fila.id === nuevaArea.id && idx !== indexFila
    );

    if (areaDuplicada) {
      Alert.alert(
        "Área Duplicada",
        `El área "${nuevaArea.nombre}" ya está asignada a otra fila del cronograma.`
      );
      return;
    }

    setFilasCronograma((prev) => {
      const nuevasFilas = [...prev];
      nuevasFilas[indexFila] = nuevaArea;
      return nuevasFilas;
    });
  };

  const agregarResultado = (resultado: ResultadoAprendizaje) => {
    if (resultados.some((r) => r.id === resultado.id)) {
      Alert.alert("Aviso", "Este resultado ya fue agregado");
      return;
    }

    // Normalización de texto nativa libre de diacríticos/acentos
    const descNormalizada = (resultado.descripcion || resultado.result || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); 

    let areaId = 4; // Por defecto: Tics

    // 📋 ENRUTAMIENTO INTELIGENTE SEGÚN TU LISTA REAL DE OBJETIVOS:
    if (
      descNormalizada.includes("diseno") || 
      descNormalizada.includes("ui") || 
      descNormalizada.includes("ux") ||
      descNormalizada.includes("interfaz")
    ) {
      areaId = 1; // Diseño
    } 
    else if (
      descNormalizada.includes("investig") || 
      descNormalizada.includes("diagnostico")
    ) {
      areaId = 2; // Investigación
    } 
    else if (
      descNormalizada.includes("agil") || 
      descNormalizada.includes("innov") || 
      descNormalizada.includes("arquitectura") ||
      descNormalizada.includes("defensa") || // "Defensa de Proyecto" se categoriza aquí
      descNormalizada.includes("empresarial")
    ) {
      areaId = 5; // Innovación
    } 
    else if (
      descNormalizada.includes("movil") || 
      descNormalizada.includes("nat") || 
      descNormalizada.includes("api") || 
      descNormalizada.includes("rest") ||
      descNormalizada.includes("base de datos") ||
      descNormalizada.includes("typeorm") ||
      descNormalizada.includes("postgres") ||
      descNormalizada.includes("nestjs") ||
      descNormalizada.includes("jwt") ||
      descNormalizada.includes("autenticacion") ||
      descNormalizada.includes("programacion")
    ) {
      areaId = 3; // Desarrollo
    }

    const areaAsociada = OPCIONES_AREAS.find((a) => a.id === areaId) || OPCIONES_AREAS[3];

    // Aseguramos dinámicamente que la fila exista en el tablero visual
    setFilasCronograma((prev) => {
      if (!prev.some((fila) => Number(fila.id) === Number(areaAsociada.id))) {
        return [...prev, areaAsociada];
      }
      return prev;
    });

    const resultadoConArea = {
      ...resultado,
      areaId: Number(areaId),
      semanasNecesarias: 4,
    };

    setResultados((prev) => [...prev, resultadoConArea]);
    setModalVisible(false);
  };

  const eliminarResultados = (ids: (number | string)[]) => {
    setResultados((prev) => prev.filter((r) => !ids.includes(r.id)));
  };

  const generarCalendario = async () => {
    try {
      const nuevasSemanas = await generarSemanas(fechaInicio);
      setSemanas(nuevasSemanas);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo generar el cronograma.");
    }
  };

  const esWeb = Platform.OS === "web";

  const dynamicTablesDirection: StyleProp<ViewStyle> = [
    styles.tablesContainer, 
    { 
      flexDirection: esWeb ? "row" : "column",
      pointerEvents: "box-none" as any 
    }
  ];

  const filtrarResultadosFaltantes = () => {
    return resultadosDisponibles.filter(
      (disponible) => !resultados.some((agregado) => agregado.id === disponible.id)
    );
  };

  return (
    <ScrollView
      style={[styles.scrollContainer, esWeb ? { height: "100vh" as any } : null]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
    >
      <View className="px-4 w-full">
        <PlanificacionHeader
          fechaInicio={fechaInicio}
          setFechaInicio={setFechaInicio}
          onGenerar={generarCalendario}
        />

        <View style={dynamicTablesDirection}>
          <View style={(esWeb ? styles.colCronogramaWeb : styles.colFullMovil) as StyleProp<ViewStyle>}>
            <View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <TablaCronograma
                areas={filasCronograma}
                opcionesDisponibles={OPCIONES_AREAS}
                semanas={semanas}
                resultados={resultados}
                onCambiarArea={cambiarAreaDeFila}
              />
            </View>
          </View>

          <View style={(esWeb ? styles.colResultadosWeb : styles.colFullMovil) as StyleProp<ViewStyle>}>
            <View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <ResultadoTable
                resultados={resultados}
                onAgregar={() => setModalVisible(true)}
                onEliminar={eliminarResultados}
              />
            </View>
          </View>
        </View>
      </View>

      <ModalResultado
        visible={modalVisible}
        resultados={filtrarResultadosFaltantes()}
        onClose={() => setModalVisible(false)}
        onSelect={agregarResultado}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { backgroundColor: "#f9fafb" },
  scrollContent: { paddingBottom: 120, flexGrow: 1 },
  tablesContainer: { width: "100%", marginTop: 16, alignItems: "flex-start" },
  colCronogramaWeb: { flex: 6, marginRight: 16 },
  colResultadosWeb: { flex: 4 },
  colFullMovil: { width: "100%", marginBottom: 16 },
});