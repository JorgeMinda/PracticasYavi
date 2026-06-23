import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import puppeteer from 'puppeteer';
import { RotationPlan } from './entities/rotation-plan.entity';
import { GeneratePlanDto } from './dto/generate-plan.dto';

@Injectable()
export class RotationPlanService {
    constructor(
        @InjectRepository(RotationPlan)
        private readonly rotationPlanRepository: Repository<RotationPlan>,
    ) {}

    findAll(): Promise<RotationPlan[]> {
        return this.rotationPlanRepository.find();
    }

    findOne(id: number): Promise<RotationPlan | null> {
        return this.rotationPlanRepository.findOneBy({ id });
    }

    create(data: Partial<RotationPlan>): Promise<RotationPlan> {
        return this.rotationPlanRepository.save(data);
    }

    async update(
        id: number,
        data: Partial<RotationPlan>,
    ): Promise<RotationPlan | null> {
        await this.rotationPlanRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.rotationPlanRepository.delete(id);
    }

    private construirFilas(dto: GeneratePlanDto): Partial<RotationPlan>[] {
        const { internshipId, filasCronograma, semanas, resultados } = dto;

        if (!semanas || !semanas.length) {
            throw new BadRequestException(
                'No hay semanas generadas en el cronograma',
            );
        }

        const startDate = semanas[0].fechaInicio;
        const endDate = semanas[semanas.length - 1].fechaFin;

        // 🔧 SOLUCIÓN DEFINITIVA: Creamos un array plano acumulador para evitar los líos de inferencia del .map().filter()
        const filas: Partial<RotationPlan>[] = [];

        for (const area of filasCronograma) {
            const resultadosDelArea = resultados.filter((r) => r.areaId === area.id);

            if (resultadosDelArea.length > 0) {
                filas.push({
                    internship_id: internshipId,
                    department: area.nombre,
                    activities: resultadosDelArea.map((r) => `• ${r.descripcion}`).join('\n'),
                    start_date: new Date(startDate),
                    end_date: new Date(endDate),
                });
            }
        }

        if (filas.length === 0) {
            throw new BadRequestException(
                'No hay resultados de aprendizaje asignados a ninguna área. Agrega al menos uno antes de guardar.',
            );
        }

        return filas;
    }

    private async guardarFilas(
        filas: Partial<RotationPlan>[],
    ): Promise<RotationPlan[]> {
        return this.rotationPlanRepository.save(filas);
    }

    private generarHtml(dto: GeneratePlanDto): string {
        const { filasCronograma, semanas, resultados } = dto;
        const ordenFilas: Record<number, number> = { 4: 0, 3: 1, 5: 2 };

        const filasHtml = filasCronograma
            .map((area) => {
                const resultadosDelArea = resultados.filter(
                    (r) => r.areaId === area.id,
                );
                const totalCasillas = resultadosDelArea.length * 4;
                const indiceFila = ordenFilas[area.id] ?? 0;

                const celdas = semanas
                    .map((semana) => {
                        const posicionGlobal = indiceFila * 8 + semana.numero;
                        const activo = posicionGlobal <= totalCasillas;
                        return `<td class="celda ${activo ? 'activa' : ''}">${activo ? '✔' : '–'}</td>`;
                    })
                    .join('');

                return `<tr><td class="area">${area.nombre}</td>${celdas}</tr>`;
            })
            .join('');

        const semanasHeader = semanas
            .map((s) => `<th>S${s.numero}<br/><span>${s.rango} ${s.mes}</span></th>`)
            .join('');

        const resultadosHtml = resultados
            .map((r, i) => `<li><strong>${i + 1}.</strong> ${r.descripcion}</li>`)
            .join('');

        return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; color: #1f2937; padding: 24px; }
          h1 { font-size: 20px; margin-bottom: 4px; }
          h2 { font-size: 14px; color: #6b7280; margin-top: 0; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
          th, td { border: 1px solid #d1d5db; padding: 8px; text-align: center; font-size: 11px; }
          th { background: #f3f4f6; }
          .area { background: #eff6ff; font-weight: bold; text-align: left; width: 120px; }
          .celda.activa { background: #d1fae5; color: #047857; font-weight: bold; }
          ul { list-style: none; padding: 0; }
          li { padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>Plan de Rotación de Prácticas</h1>
        <h2>Generado el ${new Date().toLocaleDateString('es-EC')}</h2>
        <table>
          <thead><tr><th>Área</th>${semanasHeader}</tr></thead>
          <tbody>${filasHtml}</tbody>
        </table>
        <h2 style="font-size:14px; color:#1f2937; font-weight:bold;">Resultados de Aprendizaje</h2>
        <ul>${resultadosHtml}</ul>
      </body>
    </html>`;
    }

    private async generarPdf(dto: GeneratePlanDto): Promise<Buffer> {
        const html = this.generarHtml(dto);
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        try {
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'domcontentloaded' });

            const pdfUint8Array = await page.pdf({
                format: 'A4',
                landscape: true,
                printBackground: true,
                margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
            });

            return Buffer.from(pdfUint8Array);
        } finally {
            await browser.close();
        }
    }

    async generarPlan(dto: GeneratePlanDto) {
        const filas = this.construirFilas(dto);
        const guardado = await this.guardarFilas(filas);
        const pdfBuffer = await this.generarPdf(dto);

        return {
            guardado,
            pdfBase64: pdfBuffer.toString('base64'),
        };
    }
}