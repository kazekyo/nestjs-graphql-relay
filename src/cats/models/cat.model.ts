import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  RelationId,
} from 'typeorm';
import { Node } from '../../nodes/models/node.model';
import { User } from '../../users/models/user.model';

@Entity()
@ObjectType({ implements: Node })
export class Cat implements Node {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  @Field((_type) => GraphQLISODateTime)
  readonly createdAt: Date;

  @UpdateDateColumn()
  @Field((_type) => GraphQLISODateTime)
  readonly updatedAt: Date;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  age: number;

  @ManyToOne((_type) => User, (user) => user.cats)
  user: User;

  @RelationId((cat: Cat) => cat.user)
  userId: string;

  @Field((_type) => ID, { name: 'id' })
  get relayId(): string {
    return toGlobalId('Cat', this.id);
  }
}
