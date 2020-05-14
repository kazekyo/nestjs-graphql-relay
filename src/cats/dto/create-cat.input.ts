import { Min, MaxLength } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCatInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field((_type) => Int)
  @Min(1)
  age: number;

  @Field()
  userId: string;
}
