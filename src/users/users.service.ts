import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from '../users/dto/update-user.input';
import { UserWhereUniqueInput } from '../users/dto/user-where-unique.input';
import * as Relay from 'graphql-relay';
import { isUUID } from '@nestjs/common/utils/is-uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async update(
    data: UpdateUserInput,
    where: UserWhereUniqueInput,
  ): Promise<User | undefined> {
    const parsedUserId = Relay.fromGlobalId(where.id);
    if (!isUUID(parsedUserId.id)) {
      return undefined;
    }
    const user = await this.userRepository.findOne(parsedUserId.id);
    if (!user) {
      return user;
    }
    return await this.userRepository.save({ ...user, ...data });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(internalId: string): Promise<User | undefined> {
    return await this.userRepository.findOne(internalId);
  }
}
