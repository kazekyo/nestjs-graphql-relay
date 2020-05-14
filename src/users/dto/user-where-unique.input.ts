import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UserWhereUniqueInput {
  @Field((_type) => ID)
  id: string;
}
