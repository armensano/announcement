import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class CheckDBJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.token == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
