import {
    Injectable,
} from '@nestjs/common'
import { GetCharacterDto } from './dto/get-character.dto'
import { CharacterSummary } from './models/character-summary.model'
import { AxiosRequestConfig } from 'axios'
import { CharacterProfileSummaryResponse } from 'src/external/interfaces/character-profile-summary.response'
import { CharacterTitlesSummaryResponse } from 'src/external/interfaces/character-titles-summary.response'
import { CharacterTitles, Title } from './models/character-titles.model'
import { RestDataService } from '../common/rest-data.service'


@Injectable()
export class BnetWowService {
    constructor(private readonly restDataService: RestDataService) {}

    async getCharacterProfileData(
        request,
        getCharacterDto: GetCharacterDto,
    ): Promise<CharacterSummary> {
        const { token } = request.user
        const { realmName, characterName } = getCharacterDto
        const url = `https://us.api.blizzard.com/profile/wow/character/${realmName}/${characterName}?locale=en_US&access_token=${token}`

        const response = await this.restDataService.getCall<CharacterProfileSummaryResponse>(url, this.getAxiosRequestConfig(token))

        const characterSummary = new CharacterSummary()
        characterSummary.id = response.id
        characterSummary.name = response.name
        characterSummary.level = response.level
        characterSummary.achievementPoints = response.achievement_points

        return characterSummary
    }

    async getCharacterTitles(request, getCharacterDto: GetCharacterDto): Promise<CharacterTitles> {
        const { token } = request.user
        const { realmName, characterName } = getCharacterDto
        const url = `https://us.api.blizzard.com/profile/wow/character/${realmName}/${characterName}/titles?locale=en_US&access_token=${token}`

        const response: CharacterTitlesSummaryResponse = await this.restDataService.getCall<CharacterTitlesSummaryResponse>(url, this.getAxiosRequestConfig(token))

        const characterTitles = new CharacterTitles()

        characterTitles.activeTitle = {
            id: response.active_title.id,
            name: response.active_title.name
        }
        characterTitles.titles = response.titles.map(title => {
            const mappedTitle: Title = {
                id: title.id,
                name: title.name
            }
            return mappedTitle
        })

        return characterTitles
    }

    private getAxiosRequestConfig(token: string): AxiosRequestConfig {
        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Battlenet-Namespace': 'profile-us',
                },
         }
         return config
    }


}
