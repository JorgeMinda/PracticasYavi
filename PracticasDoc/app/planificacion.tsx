import { useState, useEffect } from "react";
import { ScrollView, Alert, View, Platform, StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { getLearningResults } from "../services/dataService";
import { generarSemanas } from "../utils/generarSemanas";

import {imprimirPlanPDF} from "../utils/pdfStorage";
import { createRotationPlan } from "../services/dataService";

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
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [resultados, setResultados] = useState<ResultadoAprendizaje[]>([]);
    const [resultadosDisponibles, setResultadosDisponibles] = useState<ResultadoAprendizaje[]>([]);
    const [guardando, setGuardando] = useState<boolean>(false);

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
            const data = await getLearningResults();
            const datosMapeados: ResultadoAprendizaje[] = (data || []).map((item: { id: number; result?: string; descripcion?: string }) => ({
                id: item.id,
                descripcion: item.descripcion || item.result || "Sin descripción disponible",
                areaId: 4,
                semanasNecesarias: 4
            }));
            setResultadosDisponibles(datosMapeados);
        } catch (error) {
            console.error(error);
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

        const descNormalizada = (resultado.descripcion || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        let areaId = 4;

        if (
            descNormalizada.includes("diseno") ||
            descNormalizada.includes("ui") ||
            descNormalizada.includes("ux") ||
            descNormalizada.includes("interfaz")
        ) {
            areaId = 1;
        } else if (
            descNormalizada.includes("investiga") ||
            descNormalizada.includes("diagnostico")
        ) {
            areaId = 2;
        } else if (
            descNormalizada.includes("agil") ||
            descNormalizada.includes("innov") ||
            descNormalizada.includes("arquitectura") ||
            descNormalizada.includes("empresarial")
        ) {
            areaId = 5;
        } else if (
            descNormalizada.includes("movil") ||
            descNormalizada.includes("nat") ||
            descNormalizada.includes("api") ||
            descNormalizada.includes("rest") ||
            descNormalizada.includes("base de datos") ||
            descNormalizada.includes("typeorm") ||
            descNormalizada.includes("postgres") ||
            descNormalizada.includes("nestjs") ||
            descNormalizada.includes("defensa") ||
            descNormalizada.includes("jwt") ||
            descNormalizada.includes("autenticacion") ||
            descNormalizada.includes("programacion")
        ) {
            areaId = 3;
        }

        const areaAsociada = OPCIONES_AREAS.find((a) => a.id === areaId) || OPCIONES_AREAS[3];

        setFilasCronograma((prev) => {
            if (!prev.some((fila) => fila.id === areaAsociada.id)) {
                return [...prev, areaAsociada];
            }
            return prev;
        });

        const resultadoConArea: ResultadoAprendizaje = {
            ...resultado,
            areaId: areaId,
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
            console.error(error);
            Alert.alert("Error", "No se pudo generar el cronograma.");
        }
    };

   

    // Lógica para ejecutar la inserción en la base de datos
    const procederAGuardar = async () => {
        setGuardando(true);

        try {
            const departamentosElegidos = filasCronograma.map(f => f.nombre).join(", ");

            const actividadesTexto = resultados.map(r => 
                `- [Área ${r.areaId}]: ${r.descripcion} (${r.semanasNecesarias} semanas)`
            ).join("\n");

            const formatearFecha = (date: Date) => date.toISOString().split('T')[0];
            
            const fechaFinCalculada = semanas.length > 0 
                ? new Date(semanas[semanas.length - 1].fechaFin)
                : new Date();

            const payload = {
                internship_id: 1,
                department: departamentosElegidos || "General",
                activities: actividadesTexto,
                start_date: formatearFecha(fechaInicio),
                end_date: formatearFecha(fechaFinCalculada)
            };

            const resultado = await createRotationPlan(payload);
            console.log("Respuesta Exitosa de Supabase:", resultado);

            // Alerta simulando un Toast / Confirmación exitosa en pantalla
            Alert.alert("Éxito", "¡Plan de rotación guardado correctamente!");

            // Si Supabase devuelve el registro dentro de un arreglo, generamos el PDF automáticamente
 const htmlContent = `
<html>
<head>
<style>
body{
font-family:Arial;
padding:30px;
}
</style>
</head>
<body>

<h1>
Plan de Rotación
</h1>

<p>
Departamento:
${payload.department}
</p>

<p>
Inicio:
${payload.start_date}
</p>

<p>
Fin:
${payload.end_date}
</p>

<h3>
Actividades
</h3>

<pre>
${payload.activities}
</pre>

</body>
</html>
`;

const pdfUrl =
  await imprimirPlanPDF(
    htmlContent,
    1, // internship_id
    1  // usuario
  );

console.log(
  "PDF Guardado:",
  pdfUrl
);

        } catch (error: any) {
            console.error("🔴 Error completo al guardar en Supabase:");
            if (error.response) {
                console.error("Detalle de Supabase:", error.response.data);
                Alert.alert("Error de Servidor", `Supabase dice: ${error.response.data.message || "Error de autenticación/permisos"}`);
            } else {
                console.error(error);
                Alert.alert("Error", "Ocurrió un error al guardar el plan.");
            }
        } finally {
            setGuardando(false);
        }
    };

    // Función principal de guardado con cuadro de confirmación previo
    const handleGuardar = () => {
        if (resultados.length === 0) {
            Alert.alert("Validación", "Debes agregar al menos un resultado de aprendizaje.");
            return;
        }
        if (semanas.length === 0) {
            Alert.alert("Validación", "Por favor, genera el cronograma antes de guardar.");
            return;
        }

        if (Platform.OS === "web") {
            // Confirmación específica en Web (Corregido con paréntesis)
            const confirmarWeb = window.confirm("¿Estás seguro de que deseas guardar este Plan de Rotación?");
            if (confirmarWeb) {
                procederAGuardar();
            }
        } else {
            // Confirmación nativa en Móviles (Android / iOS)
            Alert.alert(
                "Confirmación",
                "¿Estás seguro de que deseas guardar este Plan de Rotación?",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Guardar", onPress: procederAGuardar }
                ]
            );
        }
    };

    const esWeb = Platform.OS === "web";

    const dynamicTablesDirection: StyleProp<ViewStyle> = [
        styles.tablesContainer,
        {
            flexDirection: esWeb ? "row" : "column",
        }
    ];

    const filtrarResultadosFaltantes = (): ResultadoAprendizaje[] => {
        return resultadosDisponibles.filter(
            (disponible) => !resultados.some((agregado) => agregado.id === disponible.id)
        );
    };

    return (
        <ScrollView
            style={[styles.scrollContainer, esWeb ? { height: "100vh" as ViewStyle["height"] } : null]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
        >
            <View style={styles.paddingView}>
                <PlanificacionHeader
                    fechaInicio={fechaInicio}
                    setFechaInicio={setFechaInicio}
                    onGenerar={generarCalendario}
                />

                <View style={dynamicTablesDirection}>
                    <View style={(esWeb ? styles.colCronogramaWeb : styles.colFullMovil) as StyleProp<ViewStyle>}>
                        <View style={styles.cardWrapper}>
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
                        <View style={[styles.cardWrapper, styles.overflowHidden]}>
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

            <View style={styles.actionButtonContainer}>
                <TouchableOpacity 
                    style={[styles.submitButton, { backgroundColor: guardando ? "#60a5fa" : "#2563eb" }]}
                    onPress={handleGuardar}
                    disabled={guardando}
                >
                    {guardando ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.submitButtonText}>Guardar Plan</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { backgroundColor: "#f9fafb" },
    scrollContent: { paddingBottom: 120, flexGrow: 1 },
    paddingView: { paddingHorizontal: 16, width: "100%" },
    tablesContainer: { width: "100%", marginTop: 16, alignItems: "flex-start" },
    colCronogramaWeb: { flex: 6, marginRight: 16 },
    colResultadosWeb: { flex: 4 },
    colFullMovil: { width: "100%", marginBottom: 16 },
    cardWrapper: { backgroundColor: "#ffffff", borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2, borderWidth: 1, borderColor: "#f3f4f6" },
    overflowHidden: { overflow: "hidden" },
    actionButtonContainer: { marginTop: 20, marginBottom: 20, paddingHorizontal: 16 },
    submitButton: { paddingVertical: 12, borderRadius: 12, alignItems: "center" },
    submitButtonText: { color: "#ffffff", fontWeight: "600", fontSize: 16 }
});