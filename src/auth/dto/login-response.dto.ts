import { Field, ObjectType } from '@nestjs/graphql';
import { JWTResolver } from 'graphql-scalars';

@ObjectType('UserDataResponse')
export class UserDataResponseDto {
  @Field()
  id: number;

  @Field()
  name: string;
}

@ObjectType('LoginResponse')
export class LoginResponseDto {
  @Field(() => UserDataResponseDto)
  userData: UserDataResponseDto;

  @Field(() => JWTResolver)
  accessToken: string;

  @Field(() => JWTResolver)
  refreshToken: string;
}
