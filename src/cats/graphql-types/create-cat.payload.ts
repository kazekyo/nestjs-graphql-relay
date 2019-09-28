import { Field, ObjectType } from 'type-graphql';
import { CatEdge } from '../models/cat.model';

@ObjectType()
export class CreateCatPayload {
  @Field(type => CatEdge)
  catEdge: CatEdge;
}
