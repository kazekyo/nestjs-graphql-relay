import { Field, InputType } from 'type-graphql';
import { OrderByDirection } from '../../common/order-by-direction';

@InputType()
export class CatOrderByInput {
  @Field(type => OrderByDirection, { nullable: true })
  createdAt?: OrderByDirection;

  @Field(type => OrderByDirection, { nullable: true })
  updatedAt?: OrderByDirection;
}
