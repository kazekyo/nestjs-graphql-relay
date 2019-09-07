import { Field, ObjectType } from 'type-graphql';
import { UserEdge } from '../models/user.model';

@ObjectType()
export class CreateUserPayload {
  @Field(type => UserEdge)
  userEdge: UserEdge;
}
