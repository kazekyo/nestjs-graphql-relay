import { ObjectType } from '@nestjs/graphql';
import { EdgeType } from '../../common/connection-paging';
import { User } from '../models/user.model';

@ObjectType()
export class UserEdge extends EdgeType(User) {}
