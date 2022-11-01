import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SocialsService } from './socials.service';
import { Social } from './entities/social.entity';
import { CreateSocialInput } from './dto/create-social.input';
import { UpdateSocialInput } from './dto/update-social.input';

@Resolver(() => Social)
export class SocialsResolver {
  constructor(private readonly socialsService: SocialsService) {}

  @Mutation(() => Social)
  createSocial(@Args('createSocialInput') createSocialInput: CreateSocialInput) {
    return this.socialsService.create(createSocialInput);
  }

  @Query(() => [Social], { name: 'socials' })
  findAll() {
    return this.socialsService.findAll();
  }

  @Query(() => Social, { name: 'social' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.socialsService.findOne(id);
  }

  @Mutation(() => Social)
  updateSocial(@Args('updateSocialInput') updateSocialInput: UpdateSocialInput) {
    return this.socialsService.update(updateSocialInput.id, updateSocialInput);
  }

  @Mutation(() => Social)
  removeSocial(@Args('id', { type: () => Int }) id: number) {
    return this.socialsService.remove(id);
  }
}
