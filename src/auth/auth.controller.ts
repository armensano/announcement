import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  Logger,
  forwardRef,
  Inject,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthService } from '../jwt/jwt.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginBodyDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckDBJwtAuthGuard } from 'src/jwt/jwt.guards';
import { JwtPayload } from 'src/jwt/jwt.strategy';
import { GetUser } from 'src/shared/decorator/get-user';
import { MessageToUser } from './response/message-to-user.response';
import { AccessToken } from './response/access-token.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => JwtAuthService))
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<AccessToken> {
    return await this.authService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginBodyDto: LoginBodyDto) {
    const token = await this.authService.validateUser(loginBodyDto);
    if (!token) {
      throw new InternalServerErrorException('Invalid credentials');
    } else {
      return token;
    }
  }

  @Post('logout')
  @UseGuards(CheckDBJwtAuthGuard)
  async logout(@GetUser() user: JwtPayload): Promise<MessageToUser> {
    return await this.authService.logout(user.id);
  }

  @Delete()
  @UseGuards(CheckDBJwtAuthGuard)
  async delete(@GetUser() user: JwtPayload): Promise<MessageToUser> {
    return await this.authService.delete(user.id);
  }
}
