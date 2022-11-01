import { Test, TestingModule } from '@nestjs/testing';
import { SocialsResolver } from './socials.resolver';
import { SocialsService } from './socials.service';

describe('SocialsResolver', () => {
  let resolver: SocialsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialsResolver, SocialsService],
    }).compile();

    resolver = module.get<SocialsResolver>(SocialsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
