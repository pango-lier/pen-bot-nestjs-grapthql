import { Field, InputType } from '@nestjs/graphql';
import { IsJWT, IsNotEmpty } from 'class-validator';

@InputType()
export class RefreshTokenInputDTO {
  @IsNotEmpty()
  @IsJWT()
  @Field()
  refreshToken: string;
}
