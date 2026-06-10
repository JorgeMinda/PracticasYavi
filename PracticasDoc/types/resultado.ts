export interface ResultadoAprendizaje {
  id: number;
  descripcion: string;
  areaId?: number;        // ← Nuevo: a qué área pertenece
  semanasNecesarias?: number; // ← Opcional: cuántas semanas necesita
}