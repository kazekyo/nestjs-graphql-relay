import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 33306,
  username: 'root',
  password: 'root',
  database: 'test',
  synchronize: true,
  charset: 'utf8mb4',
  entities: [__dirname + '/**/models/*.model.{js,ts}'],
  logging: true,
};

export = config;
