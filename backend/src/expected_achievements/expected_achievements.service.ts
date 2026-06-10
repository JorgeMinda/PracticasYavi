import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpectedAchievement } from './entities/expected_achievement.entity';

@Injectable()
export class ExpectedAchievementsService {
  constructor(
    @InjectRepository(ExpectedAchievement)
    private readonly repository: Repository<ExpectedAchievement>,
  ) {}

  async findAll(): Promise<ExpectedAchievement[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<ExpectedAchievement> {
    const achievement = await this.repository.findOne({
      where: { id: id as any }
    });
    
    if (!achievement) {
      throw new NotFoundException(`Expected Achievement con ID ${id} no fue encontrado`);
    }
    return achievement;
  }

  async create(data: any): Promise<ExpectedAchievement> {
    // 👇 Forzamos a que el método create devuelva explícitamente una única entidad
    const newAchievement = this.repository.create({
      semester_id: data.semester_id,
      description: data.description,
      created_at: new Date(),
    } as ExpectedAchievement); // 👈 El truco está en este casting 'as ExpectedAchievement'
    
    return await this.repository.save(newAchievement);
  }

  async update(id: number, data: any): Promise<ExpectedAchievement> {
    const achievement = await this.findOne(id);
    const updated = this.repository.merge(achievement, {
      ...data,
      updated_at: new Date(),
    });
    return await this.repository.save(updated);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.findOne(id);
    await this.repository.delete(id);
    return { deleted: true };
  }
}