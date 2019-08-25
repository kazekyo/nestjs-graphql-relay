import { Field, ID, InterfaceType } from 'type-graphql';

@InterfaceType()
export class Node {
  @Field(type => ID)
  id: string;
}
