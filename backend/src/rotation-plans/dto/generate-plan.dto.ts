import { IsInt, IsArray,  ArrayMinSize } from 'class-validator';

export class SemanaDto {
    numero: number;
    fechaInicio: string;
    fechaFin: string;
    rango: string;
    mes: string;
}

export class AreaDto {
    id: number;
    nombre: string;
}

export class ResultadoAsignadoDto {
    id: number | string;
    descripcion: string;
    areaId: number;
    semanasNecesarias: number;
}

export class GeneratePlanDto {
    @IsInt()
    internshipId: number;

    @IsArray()
    @ArrayMinSize(1)
    filasCronograma: AreaDto[];

    @IsArray()
    @ArrayMinSize(1)
    semanas: SemanaDto[];

    @IsArray()
    resultados: ResultadoAsignadoDto[];
}