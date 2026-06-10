import { Injectable } from '@nestjs/common';
import { CreateLearningObjectiveDto } from './dto/create-learning_objective.dto';
import { UpdateLearningObjectiveDto } from './dto/update-learning_objective.dto';

@Injectable()
export class LearningObjectivesService {
  create(createLearningObjectiveDto: CreateLearningObjectiveDto) {
    return 'This action adds a new learningObjective';
  }

  findAll() {
    return `This action returns all learningObjectives`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learningObjective`;
  }

  update(id: number, updateLearningObjectiveDto: UpdateLearningObjectiveDto) {
    return `This action updates a #${id} learningObjective`;
  }

  remove(id: number) {
    return `This action removes a #${id} learningObjective`;
  }
}
