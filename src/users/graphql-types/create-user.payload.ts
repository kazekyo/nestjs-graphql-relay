import { ObjectType, Field } from '@nestjs/graphql';
import { UserEdge } from './connection-types';

@ObjectType()
export class CreateUserPayload {
  @Field((_type) => UserEdge)
  userEdge: UserEdge;
}
