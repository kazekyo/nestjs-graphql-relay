import { InterfaceType, Field, ID } from '@nestjs/graphql';

@InterfaceType()
export abstract class Node {
  @Field((_type) => ID, { name: 'id' })
  relayId: string;
}
