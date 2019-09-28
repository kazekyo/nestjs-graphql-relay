import { Field, ObjectType } from 'type-graphql';
import { ConnectionType, EdgeType } from '../../common/connection-paging';
import { Cat } from '../models/cat.model';

@ObjectType()
export class CatEdge extends EdgeType(Cat) {}

@ObjectType()
class AggregateCat {
  @Field(type => Number)
  count: number;
}

@ObjectType()
export class CatConnection extends ConnectionType(Cat, CatEdge) {
  @Field(type => AggregateCat)
  aggregate: AggregateCat;
}
