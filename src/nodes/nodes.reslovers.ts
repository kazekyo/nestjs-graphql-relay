import { isUUID } from '@nestjs/common/utils/is-uuid';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { fromGlobalId } from 'graphql-relay';
import { CatsService } from '../cats/cats.service';
import { UsersService } from '../users/users.service';
import { Node } from './models/node.model';

@Resolver()
export class NodesResolvers {
  constructor(
    private readonly catsService: CatsService,
    private readonly usersService: UsersService,
  ) {}

  @Query((_returns) => Node, { nullable: true })
  async node(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<Node | undefined | null> {
    const resolvedGlobalId = fromGlobalId(id);
    if (!isUUID(resolvedGlobalId.id)) {
      return null;
    }
    switch (resolvedGlobalId.type) {
      case 'Cat':
        return await this.catsService.findOneById(resolvedGlobalId.id);
      case 'User':
        return await this.usersService.findOneById(resolvedGlobalId.id);
      default:
        break;
    }
    return null;
  }
}
