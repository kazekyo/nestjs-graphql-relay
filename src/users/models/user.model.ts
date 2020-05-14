import { Field, ID, ObjectType } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cat } from '../../cats/models/cat.model';
import { Node } from '../../nodes/models/node.model';

@Entity()
@ObjectType({ implements: Node })
export class User implements Node {
  // NOTE : I like uuid, but it has nothing to do with the relay specification.
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field((_type) => ID, { name: 'id' })
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

  @OneToMany((_type) => Cat, (cat) => cat.user)
  cats: Cat[];
}
