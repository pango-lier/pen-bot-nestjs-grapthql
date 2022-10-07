import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Role } from './entities/role.entity';
import { RoleDto } from './dto/role.dto';

@Module({
  providers: [],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Role])],
      resolvers: [
        {
          DTOClass: RoleDto,
          EntityClass: Role,
        },
      ],
    }),
  ],
})
export class RolesModule {}
