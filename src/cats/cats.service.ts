import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatConnection } from 'src/cats/graphql-types/connection-types';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateCatInput } from '../cats/dto/create-cat.input';
import { ConnectionArgs, findAndPaginate } from '../common/connection-paging';
import { Cat } from './models/cat.model';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {}

  async create(data: CreateCatInput): Promise<Cat> {
    const { userId, ...restData } = data;
    const cat = this.catRepository.create({
      ...restData,
      user: { id: userId },
    });
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
    order: FindManyOptions<Cat>['order'],
    connArgs: ConnectionArgs,
  ): Promise<CatConnection> {
    const connection = await findAndPaginate(
      { where, order },
      connArgs,
      this.catRepository,
    );
    const count = await this.catRepository.count({ where });
    return {
      ...connection,
      aggregate: { count },
    };
  }
}
