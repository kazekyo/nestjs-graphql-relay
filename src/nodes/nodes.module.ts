import { Module } from '@nestjs/common';
import { CatsModule } from 'src/cats/cats.module';
import { NodesResolvers } from 'src/nodes/nodes.reslovers';

@Module({
  imports: [CatsModule],
  providers: [NodesResolvers],
})
export class NodesModule {}
