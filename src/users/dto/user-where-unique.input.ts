import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class UserWhereUniqueInput {
  @Field(type => ID)
  id: string;
}
