import { Test, TestingModule } from '@nestjs/testing'
import { BnetWowService } from './bnet-wow.service'
import { GetCharacterDto } from './dto/get-character.dto'
import { CharacterSummary } from './models/character-summary.model'
import { RestDataService } from '../common/rest-data.service'

const mockGetCharacterDto: GetCharacterDto = {
    characterName: 'soupinacan',
    realmName: 'malorne',
}

const mockRequest = {
    user: {
        token: '12345',
    },
}

const mockBlizzardApiResponse = {
    id: '1',
    name: 'player1',
    level: 60,
    // eslint-disable-next-line @typescript-eslint/camelcase
    achievement_points: 800,
}

const mockBlizardTitlesResponse = {
    
}
const mockRestDataService = {
    getCall: jest.fn(),
}

const expectedHeaders = {
    headers: {
        Authorization: `Bearer ${mockRequest.user.token}`,
        'Battlenet-Namespace': 'profile-us',
    },
}

describe('BnetWowService', () => {
    let bnetWowService: BnetWowService
    let restDataService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BnetWowService,
                { provide: RestDataService, useValue: mockRestDataService },
            ],
        }).compile()
        bnetWowService = module.get<BnetWowService>(BnetWowService)
        restDataService = module.get<RestDataService>(RestDataService)
    })

    it('should be defined', () => {
        expect(bnetWowService).toBeDefined()
    })

    describe('getCharacterProfileData', () => {
        it('should call the rest data service and return CharacterSummary', async () => {
            restDataService.getCall.mockResolvedValue(mockBlizzardApiResponse)
            const expectedUrl = `https://us.api.blizzard.com/profile/wow/character/${mockGetCharacterDto.realmName}/${mockGetCharacterDto.characterName}?locale=en_US&access_token=${mockRequest.user.token}`
            const characterSummary: CharacterSummary = await bnetWowService.getCharacterProfileData(
                mockRequest,
                mockGetCharacterDto,
            )

            expect(mockRestDataService.getCall).toHaveBeenCalledWith(
                expectedUrl,
                expectedHeaders,
            )
            expect(characterSummary.level).toEqual(60)
            expect(characterSummary.name).toEqual(`player1`)
            expect(characterSummary.id).toEqual('1')
            expect(characterSummary.achievementPoints).toEqual(800)
        })
    })
})
