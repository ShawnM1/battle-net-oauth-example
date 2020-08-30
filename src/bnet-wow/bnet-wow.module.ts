import { Module } from '@nestjs/common';
import { BnetWowController } from './bnet-wow.controller';
import { BnetWowService } from './bnet-wow.service';
import { AuthModule } from 'src/auth/auth.module';
import { RestDataModule } from 'src/common/rest-data.module';

@Module({
  imports: [AuthModule, RestDataModule],
  controllers: [BnetWowController],
  providers: [BnetWowService],
})
export class BnetWowModule {}
