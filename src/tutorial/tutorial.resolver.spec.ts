import { Test, TestingModule } from '@nestjs/testing';
import { TutorialResolver } from './tutorial.resolver';
import { TutorialService } from './tutorial.service';

describe('TutorialResolver', () => {
  let resolver: TutorialResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorialResolver, TutorialService],
    }).compile();

    resolver = module.get<TutorialResolver>(TutorialResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
