import { Injectable } from '@nestjs/common';
import { CreateTutorialInput } from './dto/create-tutorial.input';
import { UpdateTutorialInput } from './dto/update-tutorial.input';

@Injectable()
export class TutorialService {
  create(createTutorialInput: CreateTutorialInput) {
    return 'This action adds a new tutorial';
  }

  findAll() {
    return `This action returns all tutorial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tutorial`;
  }

  update(id: number, updateTutorialInput: UpdateTutorialInput) {
    return `This action updates a #${id} tutorial`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutorial`;
  }
}
