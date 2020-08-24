import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BnetWowModule } from './bnet-wow/bnet-wow.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), BnetWowModule],
  controllers: [AuthController],
})
export class AppModule {}
