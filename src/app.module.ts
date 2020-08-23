import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BnetWowModule } from './bnet-wow/bnet-wow.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), BnetWowModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
