import { Module } from '@nestjs/common';
import { CatsModule } from '../cats/cats.module';
import { NodesResolvers } from './nodes.reslovers';

@Module({
  imports: [CatsModule],
  providers: [NodesResolvers],
})
export class NodesModule {}
