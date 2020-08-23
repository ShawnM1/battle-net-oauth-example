import { Test, TestingModule } from '@nestjs/testing'
import { BnetWowService } from './bnet-wow.service'
import { HttpService } from '@nestjs/common'
import { GetCharacterDto } from './dto/get-character.dto'
import { CharacterSummary } from './models/character-summary.model'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs'

const mockGetCharacterDto: GetCharacterDto = {
    characterName: 'soupinacan',
    realmName: 'malorne'
}

const mockRequest = {
  user: {
    token: '12345'
  }
}

const mockHttpService = {
  get: jest.fn()
}

const mockBlizzardApiResponse = {
  id: '1',
  name: 'player1',
  level: 60,
  // eslint-disable-next-line @typescript-eslint/camelcase
  achievement_points: 800
}

const mockHttpResponse: AxiosResponse = {
  data: mockBlizzardApiResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
}

describe('BnetWowService', () => {
    let bnetWowService: BnetWowService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BnetWowService, { provide: HttpService, useValue: mockHttpService}],
        }).compile()
        bnetWowService = module.get<BnetWowService>(BnetWowService)
    })

    it('should be defined', () => {
        expect(bnetWowService).toBeDefined()
    })

    describe('getCharacterProfileData', () => {
        it('should call the blizzard api and return CharacterSummary', async () => {
          const httpServiceSpy = mockHttpService.get.mockImplementation(()=> { return of(mockHttpResponse) })
          const expectedUrl = `https://us.api.blizzard.com/profile/wow/character/${mockGetCharacterDto.realmName}/${mockGetCharacterDto.characterName}?locale=en_US&access_token=${mockRequest.user.token}`
          const expectedHeaders = {
            headers: {
                'Authorization': `Bearer ${mockRequest.user.token}`,
                'Battlenet-Namespace': 'profile-us',
            }
          }
          const characterSummary: CharacterSummary = await bnetWowService.getCharacterProfileData(mockRequest, mockGetCharacterDto)

          expect(httpServiceSpy).toHaveBeenCalledWith(expectedUrl,expectedHeaders)
          expect(characterSummary.level).toEqual(60)
          expect(characterSummary.name).toEqual(`player1`)
          expect(characterSummary.id).toEqual('1')
          expect(characterSummary.achievementPoints).toEqual(800)
        })
    })
})
