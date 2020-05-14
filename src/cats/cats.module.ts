import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsResolvers } from './cats.resolvers';
import { CatsService } from './cats.service';
import { Cat } from './models/cat.model';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), forwardRef(() => UsersModule)],
  providers: [CatsService, CatsResolvers],
  exports: [CatsService],
})
export class CatsModule {}
