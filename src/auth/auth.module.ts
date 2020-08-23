import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BnetStrategy } from './bnet.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';

// loading .env file
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BnetStrategy, JwtStategy],
  exports: [JwtStategy, PassportModule]
})
export class AuthModule {}
