// src/utils/generarSemanas.ts
import { esFinSemana, esFeriado } from './validarFecha';
import { obtenerFeriadosEcuador } from './feriados';

export interface Semana {
  numero: number;
  fechaInicio: Date;
  fechaFin: Date;
  rango: string;
  mes: string;
}

/**
 * Genera 8 semanas laborales excluyendo fines de semana y feriados de Ecuador
 */
export const generarSemanas = async (fechaInicio: Date): Promise<Semana[]> => {
  const semanas: Semana[] = [];
  let fechaActual = new Date(fechaInicio);

  // Obtener feriados del año actual
  const feriados = await obtenerFeriadosEcuador(fechaInicio.getFullYear());

  // Ajustar al primer lunes hábil
  while (esFinSemana(fechaActual) || esFeriado(fechaActual, feriados)) {
    fechaActual.setDate(fechaActual.getDate() + 1);
  }

  for (let i = 1; i <= 8; i++) {
    const inicioSemana = new Date(fechaActual);
    let finSemana = new Date(fechaActual);
    let diasLaborales = 0;

    // Completar 5 días laborables
    while (diasLaborales < 5) {
      if (!esFinSemana(finSemana) && !esFeriado(finSemana, feriados)) {
        diasLaborales++;
      }
      if (diasLaborales < 5) {
        finSemana.setDate(finSemana.getDate() + 1);
      }
    }

    semanas.push({
      numero: i,
      fechaInicio: inicioSemana,
      fechaFin: finSemana,
      rango: `${inicioSemana.getDate()}-${finSemana.getDate()}`,
      mes: inicioSemana.toLocaleString('es-ES', { month: 'short' }).toUpperCase(),
    });

    // Avanzar al siguiente lunes hábil
    fechaActual = new Date(finSemana);
    fechaActual.setDate(fechaActual.getDate() + 1);

    while (esFinSemana(fechaActual) || esFeriado(fechaActual, feriados)) {
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
  }

  return semanas;
};