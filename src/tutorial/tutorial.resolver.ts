import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TutorialService } from './tutorial.service';
import { Tutorial } from './entities/tutorial.entity';
import { CreateTutorialInput } from './dto/create-tutorial.input';
import { UpdateTutorialInput } from './dto/update-tutorial.input';

@Resolver(() => Tutorial)
export class TutorialResolver {
  constructor(private readonly tutorialService: TutorialService) {}

  @Mutation(() => Tutorial)
  createTutorial(@Args('createTutorialInput') createTutorialInput: CreateTutorialInput) {
    return this.tutorialService.create(createTutorialInput);
  }

  @Query(() => [Tutorial], { name: 'tutorial' })
  findAll() {
    return this.tutorialService.findAll();
  }

  @Query(() => Tutorial, { name: 'tutorial' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tutorialService.findOne(id);
  }

  @Mutation(() => Tutorial)
  updateTutorial(@Args('updateTutorialInput') updateTutorialInput: UpdateTutorialInput) {
    return this.tutorialService.update(updateTutorialInput.id, updateTutorialInput);
  }

  @Mutation(() => Tutorial)
  removeTutorial(@Args('id', { type: () => Int }) id: number) {
    return this.tutorialService.remove(id);
  }
}
