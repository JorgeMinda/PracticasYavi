// src/utils/feriados.ts

const API_URL = "https://date.nager.at/api/v3/PublicHolidays";

export const obtenerFeriadosEcuador = async (year: number): Promise<Date[]> => {
  try {
    const response = await fetch(`${API_URL}/${year}/EC`);
    if (!response.ok) {
      console.warn(`No se pudieron obtener feriados para ${year}`);
      return [];
    }
    const data = await response.json();
    
    return data.map((f: any) => new Date(f.date));
  } catch (error) {
    console.warn("Error al cargar feriados de Ecuador:", error);
    return [];
  }
};