import {
    Injectable,
    HttpService,
    InternalServerErrorException,
} from '@nestjs/common'
import { catchError, map } from 'rxjs/operators'
import { AxiosResponse, AxiosError } from 'axios'
import { GetCharacterDto } from './dto/get-character.dto'
import { CharacterSummary } from './models/character-summary.model'

@Injectable()
export class BnetWowService {
    constructor(private readonly httpService: HttpService) {}

    async getCharacterProfileData(
        request,
        getCharacterDto: GetCharacterDto,
    ): Promise<CharacterSummary> {
        const response = await this.makeCall(request, getCharacterDto)

        const characterSummary = new CharacterSummary()
        characterSummary.id = response.id
        characterSummary.name = response.name
        characterSummary.level = response.level
        characterSummary.achievementPoints = response.achievement_points

        return characterSummary
    }

    private async makeCall(request,getCharacterDto: GetCharacterDto): Promise<any> {
        const { token } = request.user
        const { realmName, characterName } = getCharacterDto
        const url = `https://us.api.blizzard.com/profile/wow/character/${realmName}/${characterName}?locale=en_US&access_token=${token}`

        return this.httpService
            .get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Battlenet-Namespace': 'profile-us',
                },
            })
            .pipe(
                catchError((err: AxiosError) => {
                    throw new InternalServerErrorException(err)
                }),
                map((response: AxiosResponse) => {
                    return response.data
                }),
            )
            .toPromise()
    }
}
