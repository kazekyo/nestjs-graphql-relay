import { Field, InputType } from 'type-graphql';

@InputType()
export class CatWhereInput {
  @Field(type => String, { nullable: true })
  name?: string;
}
