import { Field, ObjectType } from '@nestjs/graphql';
import { ConnectionType, EdgeType } from '../../common/connection-paging';
import { Cat } from '../models/cat.model';

@ObjectType()
export class CatEdge extends EdgeType(Cat) {}

@ObjectType()
class AggregateCat {
  @Field((_type) => Number)
  count: number;
}

@ObjectType()
export class CatConnection extends ConnectionType(Cat, CatEdge) {
  @Field((_type) => AggregateCat)
  aggregate: AggregateCat;
}
