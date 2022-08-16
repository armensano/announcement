import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthModule } from '../jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => JwtAuthModule), TypeOrmModule.forFeature([User])],
  exports: [AuthService],
})
export class AuthModule {}
