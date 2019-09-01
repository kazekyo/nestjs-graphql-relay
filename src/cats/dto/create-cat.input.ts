import { Min, MaxLength } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CreateCatInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field(type => Int)
  @Min(1)
  age: number;

  @Field()
  userId: string;
}
