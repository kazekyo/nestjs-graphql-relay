import { registerEnumType } from '@nestjs/graphql';

export enum OrderByDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderByDirection, { name: 'OrderByDirection' });
