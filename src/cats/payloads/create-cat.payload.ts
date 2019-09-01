import { Field, ObjectType } from 'type-graphql';
import * as Relay from 'graphql-relay';
import { Cat, Edge } from '../models/cat.model';

@ObjectType()
export class CreateCatPayload {
  @Field(type => Edge)
  catEdge: Relay.Edge<Cat>;
}
