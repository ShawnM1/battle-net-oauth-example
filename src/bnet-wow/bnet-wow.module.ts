import { Module, HttpModule } from '@nestjs/common';
import { BnetWowController } from './bnet-wow.controller';
import { BnetWowService } from './bnet-wow.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, HttpModule],
  controllers: [BnetWowController],
  providers: [BnetWowService]
})
export class BnetWowModule {}
