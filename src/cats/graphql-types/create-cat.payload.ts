import { Field, ObjectType } from '@nestjs/graphql';
import { CatEdge } from './connection-types';

@ObjectType()
export class CreateCatPayload {
  @Field((_type) => CatEdge)
  catEdge: CatEdge;
}
