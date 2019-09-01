import { Args, Query, Resolver } from '@nestjs/graphql';
import { Node } from './models/node.model';
import { CatsService } from '../cats/cats.service';
import { fromGlobalId } from 'graphql-relay';
import { ID } from 'type-graphql';
import { UsersService } from '../users/users.service';

@Resolver()
export class NodesResolvers {
  constructor(
    private readonly catsService: CatsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(returns => Node, { nullable: true })
  async node(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<Node | undefined | null> {
    const resolvedGlobalId = fromGlobalId(id);
    const isUUID = resolvedGlobalId.id.match(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
    );
    if (!isUUID) {
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
