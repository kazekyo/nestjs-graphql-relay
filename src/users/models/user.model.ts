import { Field, ID, ObjectType } from 'type-graphql';
import { Node } from '../../nodes/models/node.model';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { toGlobalId } from 'graphql-relay';
import { EdgeType } from '../../common/connectionPaging';
import { Cat } from '../../cats/models/cat.model';

@Entity()
@ObjectType({ implements: Node })
export class User implements Node {
  // NOTE : I like uuid, but it has nothing to do with the relay specification.
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(type => ID, { name: 'id' })
  get relayId(): string {
    return toGlobalId('User', this.id);
  }

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Column()
  @Field()
  name: string;

  @OneToMany(type => Cat, cat => cat.user)
  cats: Cat[];
}

@ObjectType()
export class UserEdge extends EdgeType(User) {}
