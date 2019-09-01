import { Module } from '@nestjs/common';
import { CatsModule } from '../cats/cats.module';
import { NodesResolvers } from './nodes.reslovers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [CatsModule, UsersModule],
  providers: [NodesResolvers],
})
export class NodesModule {}
