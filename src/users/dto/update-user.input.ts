import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @MaxLength(30)
  name: string;
}
