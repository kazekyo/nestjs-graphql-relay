import { Injectable } from '@nestjs/common';
import { Cat } from './models/cat.model';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ConnectionArgs, findAndPaginate } from '../common/connection-paging';
import { CreateCatInput } from '../cats/dto/create-cat.input';
import * as Relay from 'graphql-relay';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {}

  async create(data: CreateCatInput): Promise<Cat> {
    const { userId, ...noUserIdData } = data;
    const parsedUserId = Relay.fromGlobalId(userId);
    const cat = this.catRepository.create({
      ...noUserIdData,
      user: { id: parsedUserId.id },
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
    connArgs: ConnectionArgs,
  ) {
    return await findAndPaginate(
      { where, order: { createdAt: 'ASC' } },
      connArgs,
      this.catRepository,
    );
  }
}
