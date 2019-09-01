import { Field, ObjectType } from 'type-graphql';
import * as Relay from 'graphql-relay';
import { User, Edge } from '../models/user.model';

@ObjectType()
export class CreateUserPayload {
  @Field(type => Edge)
  userEdge: Relay.Edge<User>;
}
