import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginInputDTO } from './dto/login-input.dto';

import { RefreshTokenInputDTO } from './dto/refresh-token-input.dto';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { User } from 'src/users/entities/user.entity';
import { AuthenticatedUser } from './interface/authenticated-user.interface';
import { CurrentUser } from './decorator/current-user.decorator';
import { UserDto } from 'src/users/dto/user.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponseDto)
  async login(@Args('input') input: LoginInputDTO): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(
      input.email,
      input.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Mutation(() => LoginResponseDto)
  async refreshToken(
    @Args('input') input: RefreshTokenInputDTO,
  ): Promise<LoginResponseDto> {
    return await this.authService.createAccessTokenFromRefreshToken(
      input.refreshToken,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserDto)
  me(@CurrentUser() user: AuthenticatedUser): Promise<User> {
    return this.authService.currentUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserDto)
  async logout(@CurrentUser() user: AuthenticatedUser): Promise<User> {
    return await this.authService.removeRefreshToken(user.id);
  }
}
