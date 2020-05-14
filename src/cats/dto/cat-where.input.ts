import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CatWhereInput {
  @Field((_type) => String, { nullable: true })
  name?: string;
}
