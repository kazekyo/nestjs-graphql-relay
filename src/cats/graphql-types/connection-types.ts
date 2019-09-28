import { ObjectType } from 'type-graphql';
import { ConnectionType, EdgeType } from '../../common/connection-paging';
import { Cat } from '../models/cat.model';

@ObjectType()
export class CatEdge extends EdgeType(Cat) {}

@ObjectType()
export class CatConnection extends ConnectionType(Cat, CatEdge) {}
