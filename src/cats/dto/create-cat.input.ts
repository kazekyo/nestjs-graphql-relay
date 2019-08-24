import { Min, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateCatInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  @Min(1)
  age: number;
}
