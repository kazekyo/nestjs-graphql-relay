import { Field, ObjectType } from 'type-graphql';
import { UserEdge } from './connection-types';

@ObjectType()
export class CreateUserPayload {
  @Field(type => UserEdge)
  userEdge: UserEdge;
}
