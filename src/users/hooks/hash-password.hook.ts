import {
  BeforeCreateManyHook,
  BeforeCreateOneHook,
  BeforeUpdateManyHook,
  BeforeUpdateOneHook,
  CreateManyInputType,
  CreateOneInputType,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import { Injectable } from '@nestjs/common';

import { getRounds, hashSync } from 'bcryptjs';
import { User } from '../entities/user.entity';

export const hashPassword = (password: string) => {
  if (!password || (password && getRounds(password))) {
    return password;
  }
  return hashSync(password, 10);
};

@Injectable()
export class HashPasswordCreateOneHook<T extends User>
  implements BeforeCreateOneHook<T>
{
  async run(instance: CreateOneInputType<T>): Promise<CreateOneInputType<T>> {
    instance.input.password = hashPassword(instance.input.password);
    return instance;
  }
}

@Injectable()
export class HashPasswordCreateManyHook<T extends User>
  implements BeforeCreateManyHook<T>
{
  async run(instance: CreateManyInputType<T>): Promise<CreateManyInputType<T>> {
    instance.input = instance.input.map((c) => ({
      ...c,
      password: hashPassword(c.password),
    }));
    return instance;
  }
}

@Injectable()
export class HashPasswordUpdateOneHook<T extends User>
  implements BeforeUpdateOneHook<T>
{
  async run(instance: UpdateOneInputType<T>): Promise<UpdateOneInputType<T>> {
    instance.update.password = hashPassword(instance.update.password);
    return instance;
  }
}

@Injectable()
export class HashPasswordUpdateManyHook<T extends User>
  implements BeforeUpdateManyHook<T, T>
{
  async run(
    instance: UpdateManyInputType<T, T>,
  ): Promise<UpdateManyInputType<T, T>> {
    instance.update.password = hashPassword(instance.update.password);
    return instance;
  }
}
