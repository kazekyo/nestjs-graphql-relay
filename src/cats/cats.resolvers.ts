import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cat } from './models/cat.model';
import { CatsService } from './cats.service';
import { CreateCatInput } from './dto/create-cat.input';
import { CreateCatPayload } from './payloads/create-cat.payload';

@Resolver(() => Cat)
export class CatsResolvers {
  constructor(private readonly catsService: CatsService) {}

  @Query(returns => [Cat])
  async getCats() {
    return await this.catsService.findAll();
  }

  @Mutation(returns => CreateCatPayload)
  async createCat(
    @Args('data') data: CreateCatInput,
  ): Promise<CreateCatPayload> {
    const createdCat = await this.catsService.create(data);
    return {
      catEdge: { node: createdCat, cursor: `temp:${createdCat.relayId}` },
    };
  }
}
