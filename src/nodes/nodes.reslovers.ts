import { Args, Query, Resolver } from '@nestjs/graphql';
import { Node } from './models/node';
import { CatsService } from 'src/cats/cats.service';
import { fromGlobalId } from 'graphql-relay';
import { Type } from '@nestjs/common';

@Resolver(of => Node)
export class NodesResolvers {
  constructor(private readonly catsService: CatsService) {}

  @Query(returns => Node, { nullable: true })
  async node(@Args('id') relayId: string) {
    const map = {
      Cat: this.catsService,
    };
    const { type, id } = fromGlobalId(relayId);
    const service = map[type];
    if (!service) {
      return null;
    }
    return await service.findOneById(id);
  }
}
