import { Injectable } from '@nestjs/common';
import { Cat } from './models/cat.model';
import { CreateCatInput } from './dto/create-cat.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {}

  async create(data: CreateCatInput): Promise<Cat> {
    const cat = this.catRepository.create(data);
    return await this.catRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  async findOneById(internalId: string): Promise<Cat | undefined> {
    return await this.catRepository.findOne(internalId);
  }
}
