import { Field, ObjectType } from 'type-graphql';
import { CatEdge } from './connection-types';

@ObjectType()
export class CreateCatPayload {
  @Field(type => CatEdge)
  catEdge: CatEdge;
}
