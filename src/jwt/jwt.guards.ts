import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt') {}

export class CheckDBJwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }
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
