import { TypeValue } from 'type-graphql/dist/decorators/types';
import { ArgsType, Field, ObjectType, Int } from 'type-graphql';
import * as Relay from 'graphql-relay';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
  Min,
  ValidateIf,
} from 'class-validator';
import { FindManyOptions, Repository } from 'typeorm';

@ObjectType()
export class PageInfo implements Relay.PageInfo {
  @Field()
  hasNextPage!: boolean;
  @Field()
  hasPreviousPage!: boolean;
  @Field({ nullable: true })
  startCursor?: Relay.ConnectionCursor;
  @Field({ nullable: true })
  endCursor?: Relay.ConnectionCursor;
}

@ValidatorConstraint({ async: false })
class CannotUseWithout implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    const required = args.constraints[0] as string;
    return object[required] !== undefined;
  }

  defaultMessage(args: ValidationArguments) {
    return `Cannot be used without \`${args.constraints[0]}\`.`;
  }
}

@ValidatorConstraint({ async: false })
class CannotUseWith implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    const result = args.constraints.every(propertyName => {
      return object[propertyName] === undefined;
    });
    return result;
  }

  defaultMessage(args: ValidationArguments) {
    return `Cannot be used with \`${args.constraints.join('` , `')}\`.`;
  }
}

@ArgsType()
export class ConnectionArgs implements Relay.ConnectionArguments {
  @Field({ nullable: true, description: 'Paginate before opaque cursor' })
  @ValidateIf(o => o.before !== undefined)
  @Validate(CannotUseWithout, ['last'])
  @Validate(CannotUseWith, ['after', 'first'])
  before?: Relay.ConnectionCursor;

  @Field({ nullable: true, description: 'Paginate after opaque cursor' })
  @ValidateIf(o => o.after !== undefined)
  @Validate(CannotUseWithout, ['first'])
  @Validate(CannotUseWith, ['before', 'last'])
  after?: Relay.ConnectionCursor;

  @Field(type => Int, { nullable: true, description: 'Paginate first' })
  @ValidateIf(o => o.first !== undefined)
  @Min(1)
  @Validate(CannotUseWith, ['before', 'last'])
  first?: number;

  @Field(type => Int, { nullable: true, description: 'Paginate last' })
  @ValidateIf(o => o.last !== undefined)
  // Required `before`. This is a weird corner case.
  // We'd have to invert the ordering of query to get the last few items then re-invert it when emitting the results.
  // We'll just ignore it for now.
  @Validate(CannotUseWithout, ['before'])
  @Validate(CannotUseWith, ['after', 'first'])
  @Min(1)
  last?: number;
}

export function connectionTypes<T extends TypeValue>(
  name: string,
  nodeType: T,
): { Connection: any; Edge: any } {
  // TODO : Use Type instead of any(Value)
  @ObjectType(`${name}Edge`)
  class Edge implements Relay.Edge<T> {
    @Field(() => nodeType)
    node!: T;

    @Field({ description: 'Used in `before` and `after` args' })
    cursor!: Relay.ConnectionCursor;
  }

  @ObjectType(`${name}Connection`)
  class Connection implements Relay.Connection<T> {
    @Field()
    pageInfo!: PageInfo;

    @Field(() => [Edge])
    edges!: Edge[];
  }

  return {
    Connection,
    Edge,
  };
}

type PagingMeta =
  | { pagingType: 'forward'; after?: string; first: number }
  | { pagingType: 'backward'; before?: string; last: number }
  | { pagingType: 'none' };

function getMeta(args: ConnectionArgs): PagingMeta {
  const { first = 0, last = 0, after, before } = args;
  const isForwardPaging = !!first || !!after;
  const isBackwardPaging = !!last || !!before;

  return isForwardPaging
    ? { pagingType: 'forward', after, first }
    : isBackwardPaging
    ? { pagingType: 'backward', before, last }
    : { pagingType: 'none' };
}

const getId = (cursor: Relay.ConnectionCursor) =>
  parseInt(Relay.fromGlobalId(cursor).id, 10);
const nextId = (cursor: Relay.ConnectionCursor) => getId(cursor) + 1;

/**
 * Create a 'paging parameters' object with 'limit' and 'offset' fields based on the incoming
 * cursor-paging arguments.
 */
export function getPagingParameters(args: ConnectionArgs) {
  const meta = getMeta(args);

  switch (meta.pagingType) {
    case 'forward': {
      return {
        limit: meta.first,
        offset: meta.after ? nextId(meta.after) : 0,
      };
    }
    case 'backward': {
      const { last, before } = meta;
      let limit = last;
      let offset = getId(before!) - last;

      // Check to see if our before-page is underflowing past the 0th item
      if (offset < 0) {
        // Adjust the limit with the underflow value
        limit = Math.max(last + offset, 0);
        offset = 0;
      }

      return { offset, limit };
    }
    default:
      return {};
  }
}

export async function findAndPaginate<T>(
  condition: FindManyOptions<T>,
  connArgs: ConnectionArgs,
  repository: Repository<T>,
) {
  const { limit, offset } = getPagingParameters(connArgs);
  const [entities, count] = await repository.findAndCount({
    ...condition,
    skip: offset,
    take: limit,
  });

  const res = Relay.connectionFromArraySlice(entities, connArgs, {
    arrayLength: count,
    sliceStart: offset || 0,
  });
  return res;
}

export {
  connectionFromArray,
  connectionFromPromisedArray,
  connectionFromArraySlice,
  connectionFromPromisedArraySlice,
} from 'graphql-relay';
