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
import { ConnectionArgs } from '../common/connection-paging';
import { CreateUserPayload } from './payloads/create-user.payload';
import { CatConnection } from '../cats/models/cat.model';
import { CatsService } from '../cats/cats.service';
import { UpdateUserInput } from '../users/dto/update-user.input';
import { UserWhereUniqueInput } from '../users/dto/user-where-unique.input';

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

  @Mutation(returns => User, { nullable: true })
  async updateUser(
    @Args('data') data: UpdateUserInput,
    @Args('where') where: UserWhereUniqueInput,
  ): Promise<User | undefined> {
    return await this.usersService.update(data, where);
  }

  @Mutation(returns => CreateUserPayload)
  async createUser(
    @Args('data') data: CreateUserInput,
  ): Promise<CreateUserPayload> {
    const user = await this.usersService.create(data);
    return {
      userEdge: { node: user, cursor: `temp:${user.relayId}` },
    };
  }

  @ResolveProperty(returns => CatConnection)
  async catsConnection(
    @Parent() user: User,
    @Args() connArgs: ConnectionArgs,
  ): Promise<CatConnection> {
    return await this.catsService.findAndPaginate(
      { user: { id: user.id } },
      connArgs,
    );
  }
}
