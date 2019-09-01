import { Injectable } from '@nestjs/common';
import { Cat } from './models/cat.model';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { ConnectionArgs, findAndPaginate } from '../common/connectionPaging';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {}

  async create(data: DeepPartial<Cat>): Promise<Cat> {
    const cat = this.catRepository.create(data);
    return await this.catRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  async findOneById(internalId: string): Promise<Cat | undefined> {
    return await this.catRepository.findOne(internalId);
  }

  async findAndPaginate(
    where: FindManyOptions<Cat>['where'],
    connArgs: ConnectionArgs,
  ) {
    return await findAndPaginate(
      { where, order: { createdAt: 'ASC' } },
      connArgs,
      this.catRepository,
    );
  }
}
