import { Field, ID, ObjectType } from 'type-graphql';
import { Node } from '../../nodes/models/node.model';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { toGlobalId } from 'graphql-relay';
import { ConnectionType, EdgeType } from '../../common/connectionPaging';
import { User } from '../../users/models/user.model';

@Entity()
@ObjectType({ implements: Node })
export class Cat implements Node {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(type => ID, { name: 'id' })
  get relayId(): string {
    return toGlobalId('Cat', this.id);
  }

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
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
}

@ObjectType()
export class CatEdge extends EdgeType(Cat) {}

@ObjectType()
export class CatConnection extends ConnectionType(Cat, CatEdge) {}
