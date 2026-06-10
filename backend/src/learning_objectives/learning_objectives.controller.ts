import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LearningObjectivesService } from './learning_objectives.service';
import { CreateLearningObjectiveDto } from './dto/create-learning_objective.dto';
import { UpdateLearningObjectiveDto } from './dto/update-learning_objective.dto';

@Controller('learning-objectives')
export class LearningObjectivesController {
  constructor(private readonly learningObjectivesService: LearningObjectivesService) {}

  @Post()
  create(@Body() createLearningObjectiveDto: CreateLearningObjectiveDto) {
    return this.learningObjectivesService.create(createLearningObjectiveDto);
  }

  @Get()
  findAll() {
    return this.learningObjectivesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningObjectivesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLearningObjectiveDto: UpdateLearningObjectiveDto) {
    return this.learningObjectivesService.update(+id, updateLearningObjectiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningObjectivesService.remove(+id);
  }
}
