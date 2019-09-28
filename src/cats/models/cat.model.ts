import { Field, GraphQLISODateTime, ID, ObjectType } from 'type-graphql';
import { Node } from '../../nodes/models/node.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { toGlobalId } from 'graphql-relay';
import { User } from '../../users/models/user.model';

@Entity()
@ObjectType({ implements: Node })
export class Cat implements Node {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  @Field(type => GraphQLISODateTime)
  readonly createdAt: Date;

  @UpdateDateColumn()
  @Field(type => GraphQLISODateTime)
  readonly updatedAt: Date;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  age: number;

  @ManyToOne(type => User, user => user.cats)
  @Field(type => User)
  user: User;

  @Field(type => ID, { name: 'id' })
  get relayId(): string {
    return toGlobalId('Cat', this.id);
  }
}
