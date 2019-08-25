import { Module } from '@nestjs/common';
import { CatsResolvers } from './cats.resolvers';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './models/cat.model';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  providers: [CatsService, CatsResolvers],
  exports: [CatsService],
})
export class CatsModule {}
