import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { ConnectionArgs } from '../common/connectionPaging';
import * as Relay from 'graphql-relay';
import { CreateUserPayload } from './payloads/create-user.payload';
import { Cat, Connection as CatConnection } from '../cats/models/cat.model';
import { CatsService } from '../cats/cats.service';

@Resolver(() => User)
export class UsersResolvers {
  constructor(
    private readonly usersService: UsersService,
    private readonly catsService: CatsService,
  ) {}

  @Query(returns => [User])
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Mutation(returns => CreateUserPayload)
  async createUser(
    @Args('data') data: CreateUserInput,
  ): Promise<CreateUserPayload> {
    const createdUser = await this.usersService.create(data);
    return {
      userEdge: { node: createdUser, cursor: `temp:${createdUser.relayId}` },
    };
  }

  @ResolveProperty(returns => CatConnection)
  async catsConnection(
    @Parent() user: User,
    @Args() connArgs: ConnectionArgs,
  ): Promise<Relay.Connection<Cat>> {
    return await this.catsService.findAndPaginate(
      { user: { id: user.id } },
      connArgs,
    );
  }
}
