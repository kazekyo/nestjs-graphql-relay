import { Module } from '@nestjs/common';
import { UsersResolvers } from './users.resolvers';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { CatsModule } from '../cats/cats.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CatsModule],
  providers: [UsersService, UsersResolvers],
  exports: [UsersService],
})
export class UsersModule {
}
