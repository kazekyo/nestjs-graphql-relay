import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Cat {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  age: number;
}
