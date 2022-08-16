import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { SALT_OR_ROUNDS } from 'src/constants';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserLogin } from './interface/user-login.interface';
import { JwtAuthService } from '../jwt/jwt.service';
import { IAccessToken } from './interface/access-token.interface';
import { IMessageToUser } from './interface/message-to-user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const { password, email } = createUserDto;
    const findUser = await this.findOneByEmail(email);
    if (findUser) {
      throw new InternalServerErrorException('User already exists');
    }
    const hash = await bcrypt.hash(password, SALT_OR_ROUNDS);
    const user: IUser = await this.userRepository.save({
      ...createUserDto,
      password: hash,
    });
    return user;
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(body: IUserLogin): Promise<IAccessToken> {
    const { email, password } = body;
    const user = await this.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return null;
    }
    const token = this.jwtAuthService.createAccessToken({
      id: user.id,
      email: user.email,
    });
    await this.userRepository.update(user.id, { token: token.accessToken });
    return token;
  }

  async logout(user: number): Promise<IMessageToUser> {
    const result = await this.userRepository.update(user, { token: null });
    console.log('result', result);

    if (result.affected === 0) {
      throw new InternalServerErrorException('User not found');
    } else {
      return { message: 'Logout success' };
    }
  }

  async delete(id: number): Promise<IMessageToUser> {
    await this.userRepository.delete(id);
    return { message: 'User deleted' };
  }
}
