import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ValidationPipe,
} from '@nestjs/common';

import { RotationPlanService } from './rotation-plans.service';
import { GeneratePlanDto } from './dto/generate-plan.dto';

@Controller('rotation-plans')
export class RotationPlanController {
    constructor(
        private readonly rotationPlanService: RotationPlanService,
    ) {}

    @Get()
    findAll() {
        return this.rotationPlanService.findAll();
    }

    // ✅ Debe ir antes de @Get(':id') para que NestJS no lo confunda con un :id
    @Post('generar')
    generar(@Body(ValidationPipe) dto: GeneratePlanDto) {
        return this.rotationPlanService.generarPlan(dto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.rotationPlanService.findOne(id);
    }

   

    @Post('guardar')
    create(@Body() body: any) {
        return this.rotationPlanService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
        return this.rotationPlanService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.rotationPlanService.remove(id);
    }
}