import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from '../cats/cats.module';
import { User } from './models/user.model';
import { UsersResolvers } from './users.resolvers';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => CatsModule)],
  providers: [UsersService, UsersResolvers],
  exports: [UsersService],
})
export class UsersModule {}
