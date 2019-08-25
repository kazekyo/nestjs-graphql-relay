import { Args, Query, Resolver } from '@nestjs/graphql';
import { Node } from './models/node.model';
import { CatsService } from '../cats/cats.service';
import { fromGlobalId } from 'graphql-relay';
import { ID } from 'type-graphql';

@Resolver()
export class NodesResolvers {
  constructor(private readonly catsService: CatsService) {}

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
    return await this.catsService.findOneById(resolvedGlobalId.id);
  }
}
