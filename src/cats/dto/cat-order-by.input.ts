import { Field, InputType } from '@nestjs/graphql';
import { OrderByDirection } from '../../common/order-by-direction';

@InputType()
export class CatOrderByInput {
  @Field((_type) => OrderByDirection, { nullable: true })
  createdAt?: OrderByDirection;

  @Field((_type) => OrderByDirection, { nullable: true })
  updatedAt?: OrderByDirection;
}
