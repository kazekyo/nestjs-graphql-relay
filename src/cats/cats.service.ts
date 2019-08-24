import { Injectable } from '@nestjs/common';
import { Cat } from './models/cat';
import { CreateCatInput } from './dto/create-cat.input';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [{ id: '1', name: 'Cat', age: 5 }];

  create(data: CreateCatInput): Cat {
    const cat = { id: 'test', ...data };
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOneById(id: string): Cat {
    return this.cats.find(cat => cat.id === id);
  }
}
