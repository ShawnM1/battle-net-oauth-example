import { Test, TestingModule } from '@nestjs/testing';
import { BnetWowController } from './bnet-wow.controller';
import { BnetWowService } from './bnet-wow.service';
import { HttpModule } from '@nestjs/common';
import { RestDataService } from '../common/rest-data.service'

const mockBnetWowService = {
  getCharacterProfileData: jest.fn(),
  getCharacterTitles: jest.fn()
}

describe('BnetWow Controller', () => {
  let controller: BnetWowController;
  let bnetWowService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [BnetWowController],
      providers: [{ provide: BnetWowService, useValue: mockBnetWowService}, RestDataService]
    }).compile();

    controller = module.get<BnetWowController>(BnetWowController);
    bnetWowService = module.get<BnetWowService>(BnetWowService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCharacterProfileData', () => {
    it('should call the bnet service getCharacterProfileData', async () => {
      await controller.getCharacterProfileData(null, null)
      expect(bnetWowService.getCharacterProfileData).toHaveBeenCalled()
    })
  })
  describe('getCharacterTitles', () => {
    it('should call the bnet service getCharacterTitles', async () => {
      await controller.getCharacterTitles(null, null)
      expect(bnetWowService.getCharacterTitles).toHaveBeenCalled()
      
    })
  })
});
