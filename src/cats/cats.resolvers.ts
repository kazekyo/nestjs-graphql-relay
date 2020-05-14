import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Cat } from './models/cat.model';
import { CatsService } from './cats.service';
import { CreateCatInput } from './dto/create-cat.input';
import { CreateCatPayload } from './graphql-types/create-cat.payload';
import * as Relay from 'graphql-relay';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';

@Resolver(() => Cat)
export class CatsResolvers {
  constructor(
    private readonly catsService: CatsService,
    private readonly usersService: UsersService,
  ) {}

  @Query((_returns) => [Cat])
  async getCats() {
    return await this.catsService.findAll();
  }

  @Mutation((_returns) => CreateCatPayload)
  async createCat(
    @Args('data') data: CreateCatInput,
  ): Promise<CreateCatPayload> {
    const { userId, ...rest } = data;
    const databaseUserId = Relay.fromGlobalId(userId).id;
    const createdCat = await this.catsService.create({
      ...rest,
      userId: databaseUserId,
    });
    return {
      catEdge: { node: createdCat, cursor: `temp:${createdCat.relayId}` },
    };
  }

  @ResolveField((_returns) => User)
  async user(@Parent() cat: Cat): Promise<User> {
    const user = await this.usersService.findOneById(cat.userId);
    return user!;
  }
}
