import { Args, Query, Resolver } from '@nestjs/graphql';
import { Node } from './models/node.model';
import { CatsService } from '../cats/cats.service';
import { fromGlobalId } from 'graphql-relay';
import { ID, createUnionType } from 'type-graphql';
import { UsersService } from '../users/users.service';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { Cat } from '../cats/models/cat.model';
import { User } from '../users/models/user.model';

const Schema = createUnionType({
  name: 'Schema',
  types: [Cat, User],
});

@Resolver()
export class NodesResolvers {
  constructor(
    private readonly catsService: CatsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(returns => Node, { nullable: true })
  async node(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<typeof Schema | null | undefined> {
    const resolvedGlobalId = fromGlobalId(id);
    if (!isUUID(resolvedGlobalId.id)) {
      return null;
    }
    switch (resolvedGlobalId.type) {
      case 'Cat':
        return this.catsService.findOneById(resolvedGlobalId.id);
      case 'User':
        return this.usersService.findOneById(resolvedGlobalId.id);
      default:
        break;
    }
    return null;
  }
}
