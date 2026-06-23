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

  const feriados = await obtenerFeriadosEcuador(fechaInicio.getFullYear());

  // Ajustar al primer día hábil
  while (esFinSemana(fechaActual) || esFeriado(fechaActual, feriados)) {
    fechaActual.setDate(fechaActual.getDate() + 1);
  }

  for (let i = 1; i <= 8; i++) {
    const diasLaborales: Date[] = [];
    let fechaTemp = new Date(fechaActual);

    // 🔥 SOLO 5 DÍAS LABORALES (L-V sin fines de semana ni feriados)
    while (diasLaborales.length < 5) {
      if (!esFinSemana(fechaTemp) && !esFeriado(fechaTemp, feriados)) {
        diasLaborales.push(new Date(fechaTemp));
      }

      fechaTemp.setDate(fechaTemp.getDate() + 1);
    }

    const inicioSemana = diasLaborales[0];
    const finSemana = diasLaborales[diasLaborales.length - 1];

    semanas.push({
      numero: i,
      fechaInicio: inicioSemana,
      fechaFin: finSemana,
      rango: `${inicioSemana.getDate()}-${finSemana.getDate()}`,
      mes: inicioSemana
        .toLocaleString('es-ES', { month: 'short' })
        .toUpperCase(),
    });

    // 🔥 mover al siguiente día hábil después de la semana
    fechaActual = new Date(finSemana);
    fechaActual.setDate(fechaActual.getDate() + 1);

    while (esFinSemana(fechaActual) || esFeriado(fechaActual, feriados)) {
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
  }

  return semanas;
};