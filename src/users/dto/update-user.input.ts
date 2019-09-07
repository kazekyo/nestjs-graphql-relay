import { MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  @MaxLength(30)
  name: string;
}
