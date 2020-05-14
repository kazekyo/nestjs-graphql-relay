import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { NodesModule } from './nodes/nodes.module';
import * as ormconfig from './ormconfig';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CatsModule,
    UsersModule,
    NodesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
    }),
    TypeOrmModule.forRoot(ormconfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
