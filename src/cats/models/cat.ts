import { Field, ID, ObjectType } from 'type-graphql';
import { Node } from '../../node/models/node';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { toGlobalId } from 'graphql-relay';

@Entity()
@ObjectType({ implements: Node })
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  internalId: string;

  // TODO : add validation
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  age: number;

  @Field(type => ID)
  get id(): string {
    return toGlobalId('Cat', this.internalId);
  }
}
