export interface ResultadoAprendizaje {
  id: number;
  descripcion: string;        // ← Volvemos a descripcion para no romper las tablas ni modales
  areaId?: number;            
  semanasNecesarias?: number; 
  result?: string;            // Opcional por si acaso lo necesitas
}