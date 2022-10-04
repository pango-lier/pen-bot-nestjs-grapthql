import {
  HttpStatus,
  Injectable,
  HttpException,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedUser } from './interface/authenticated-user.interface';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    try {
      const [user] = await this.usersService.query({
        filter: {
          email: {
            eq: email,
          },
        },
        paging: { limit: 1 },
      });
      return user;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async currentUser(authUser: AuthenticatedUser): Promise<User> {
    try {
      const user = await this.usersService.getById(authUser.id);
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async validateUser(email: string, pass: string): Promise<User> | null {
    const user = await this.findByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login({ id, name }: AuthenticatedUser) {
    const payload: JwtPayload = {
      sub: id,
      username: name,
    };
    const refreshToken = await this.jwtService.signAsync(
      payload,
      this.getTokenOptions('refresh'),
    );
    await this.setCurrentRefreshToken(refreshToken, id);
    return {
      userData: { id, name },
      accessToken: await this.jwtService.signAsync(
        payload,
        this.getTokenOptions('access'),
      ),
      refreshToken,
    };
  }

  public async createAccessTokenFromRefreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.decode(refreshToken) as JwtPayload;
      if (!decoded) {
        throw new Error();
      }
      const user = await this.usersService.getById(decoded.sub);
      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
      }
      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );
      if (!isRefreshTokenMatching) {
        throw new UnauthorizedException('Invalid token');
      }
      await this.jwtService.verifyAsync(
        refreshToken,
        this.getTokenOptions('refresh'),
      );
      return this.login(user);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private getTokenOptions(type: string) {
    const options: JwtSignOptions = {
      secret: this.configService.get(`jwt.${type}Token.secret`),
    };
    const expiration = this.configService.get<number>(`jwt.${type}Token.ttl`);
    if (expiration) {
      options.expiresIn = expiration;
    }
    return options;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const user = await this.usersService.updateOne(userId, {
      refreshToken: currentHashedRefreshToken,
    });
    if (!user) {
      throw new ConflictException();
    }
    return user;
  }

  async removeRefreshToken(userId: number) {
    const user = await this.usersService.updateOne(userId, {
      refreshToken: null,
    });
    if (!user) {
      throw new ConflictException();
    }
    return user;
  }
}
