// src/utils/validarFecha.ts

export function esFinSemana(fecha: Date): boolean {
  const dia = fecha.getDay();
  return dia === 0 || dia === 6;
}

export function esFeriado(fecha: Date, feriados: Date[] = []): boolean {
  return feriados.some((feriado) => 
    feriado.getFullYear() === fecha.getFullYear() &&
    feriado.getMonth() === fecha.getMonth() &&
    feriado.getDate() === fecha.getDate()
  );
}