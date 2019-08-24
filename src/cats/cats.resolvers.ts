import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cat } from './models/cat';
import { CatsService } from './cats.service';
import { CreateCatInput } from './dto/create-cat.input';

@Resolver(of => Cat)
export class CatsResolvers {
  constructor(private readonly catsService: CatsService) {}

  @Query(returns => [Cat])
  async getCats() {
    return await this.catsService.findAll();
  }

  @Query(returns => Cat) // TODO : 名前を元に戻して試す
  async cat2(@Args('id') id: string): Promise<Cat> {
    return await this.catsService.findOneById(id);
  }

  @Mutation(returns => Cat)
  async createCat(@Args('data') data: CreateCatInput): Promise<Cat> {
    const createdCat = await this.catsService.create(data);
    return createdCat;
  }
}
