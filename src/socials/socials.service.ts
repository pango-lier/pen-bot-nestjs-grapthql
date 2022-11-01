import { Injectable } from '@nestjs/common';
import { CreateSocialInput } from './dto/create-social.input';
import { UpdateSocialInput } from './dto/update-social.input';

@Injectable()
export class SocialsService {
  create(createSocialInput: CreateSocialInput) {
    return 'This action adds a new social';
  }

  findAll() {
    return `This action returns all socials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} social`;
  }

  update(id: number, updateSocialInput: UpdateSocialInput) {
    return `This action updates a #${id} social`;
  }

  remove(id: number) {
    return `This action removes a #${id} social`;
  }
}
