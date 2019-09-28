import { ArgsType, Field } from 'type-graphql';
import { ConnectionArgs } from '../../common/connection-paging';
import { CatWhereInput } from './cat-where.input';
import { CatOrderByInput } from './cat-order-by.input';

@ArgsType()
export class CatsConnectionArgs extends ConnectionArgs {
  @Field(type => CatWhereInput, { nullable: true })
  where?: CatWhereInput;

  @Field(type => CatOrderByInput, { nullable: true })
  orderBy?: CatOrderByInput;
}
