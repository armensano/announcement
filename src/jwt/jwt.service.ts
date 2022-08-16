import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InternalServerErrorException } from '@nestjs/common';

interface IUser {
  id: number;
  email: string;
}

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  createAccessToken(user: IUser): { accessToken: string } {
    return {
      accessToken: this.jwtService.sign({
        email: user.email,
        id: user.id,
      }),
    };
  }

  async verifyUser(accessToken: string): Promise<IUser> {
    try {
      const result = this.jwtService.verify(accessToken);
      return result;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
