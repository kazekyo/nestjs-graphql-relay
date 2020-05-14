import { ArgsType, Field } from '@nestjs/graphql';
import { ConnectionArgs } from '../../common/connection-paging';
import { CatOrderByInput } from './cat-order-by.input';
import { CatWhereInput } from './cat-where.input';

@ArgsType()
export class CatsConnectionArgs extends ConnectionArgs {
  @Field((_type) => CatWhereInput, { nullable: true })
  where?: CatWhereInput;

  @Field((_type) => CatOrderByInput, { nullable: true })
  orderBy?: CatOrderByInput;
}
