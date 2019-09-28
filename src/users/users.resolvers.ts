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
import { CreateUserPayload } from './graphql-types/create-user.payload';
import { CatConnection } from '../cats/graphql-types/connection-types';
import { CatsService } from '../cats/cats.service';
import { UpdateUserInput } from '../users/dto/update-user.input';
import { UserWhereUniqueInput } from '../users/dto/user-where-unique.input';
import { CatsConnectionArgs } from '../cats/dto/cats-connection.args';

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
    @Args() connectionArgs: CatsConnectionArgs,
  ): Promise<CatConnection> {
    const { where, orderBy: order, ...args } = connectionArgs;
    return await this.catsService.findAndPaginate(
      { ...where, user: { id: user.id } },
      order,
      args,
    );
  }
}
