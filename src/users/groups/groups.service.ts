import { QueryService } from '@nestjs-query/core';
import { Group } from './entities/group.entity';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@QueryService(Group)
export class GroupsService extends TypeOrmQueryService<Group> {
  constructor(@InjectRepository(Group) repo: Repository<Group>) {
    super(repo, { useSoftDelete: true });
  }
}
