import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { CatsService } from '../cats/cats.service';
import { CatsModule } from '../cats/cats.module';

const createApp = async (): Promise<INestApplicationContext> => {
  return await NestFactory.createApplicationContext(AppModule);
};

const main = async (): Promise<void> => {
  const app = await createApp();
  console.log('start...');

  const usersService: UsersService = app
    .select(UsersModule)
    .get(UsersService, { strict: true });
  const alice = await usersService.create({ name: 'Alice' });

  const catsService: CatsService = app
    .select(CatsModule)
    .get(CatsService, { strict: true });

  console.log(alice.id);
  await catsService.create({
    name: 'Leo',
    age: 1,
    userId: alice.id,
  });

  await app.close();
};

main()
  .then(() => {
    console.log('done.');
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
