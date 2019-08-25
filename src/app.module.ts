import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodesModule } from 'src/nodes/nodes.module';

@Module({
  imports: [
    CatsModule,
    NodesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 33306,
      username: 'root',
      password: 'root',
      database: 'test',
      synchronize: true,
      entities: ['src/*/models/*.ts'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
