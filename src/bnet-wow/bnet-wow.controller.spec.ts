import { Test, TestingModule } from '@nestjs/testing';
import { BnetWowController } from './bnet-wow.controller';
import { BnetWowService } from './bnet-wow.service';
import { HttpModule } from '@nestjs/common';
import { BnetStrategy } from 'src/auth/bnet.strategy';
import { config } from 'process';

const mockBnetWowService = {
  getCharacterProfileData: jest.fn()
}

describe('BnetWow Controller', () => {
  let controller: BnetWowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [BnetWowController],
      providers: [{ provide: BnetWowService, useValue: mockBnetWowService}]
    }).compile();

    controller = module.get<BnetWowController>(BnetWowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCharacterProfileData', () => {
    it('should the bnet service getCharacterProfileData', async () => {
      await controller.getCharacterProfileData(null, null)
      expect(mockBnetWowService.getCharacterProfileData).toHaveBeenCalled()
    })
  })
});
