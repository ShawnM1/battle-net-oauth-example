import {
    Controller,
    Get,
    Req,
    UseGuards,
    Query,
    ValidationPipe,
    HttpStatus,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { BnetWowService } from './bnet-wow.service'
import {
    ApiTags,
    ApiOperation,
    ApiOAuth2,
    ApiResponse,
} from '@nestjs/swagger'
import { GetCharacterDto } from './dto/get-character.dto'
import { CharacterSummary } from './models/character-summary.model'

@Controller('bnet-wow')
@UseGuards(AuthGuard('jwt'))
@ApiTags('bnet-wow')
@ApiOAuth2(['wow.profile'], 'bnet')
export class BnetWowController {
    constructor(private readonly bnetWowService: BnetWowService) {}

    @Get('character-profile')
    @ApiOperation({ summary: 'Returns character data' })
    @ApiResponse({
        description: 'player character data',
        status: HttpStatus.OK,
        type: CharacterSummary,
    })
    async getCharacterProfileData(
        @Req() request,
        @Query(ValidationPipe) getCharacterDto: GetCharacterDto,
    ): Promise<CharacterSummary> {
        return await this.bnetWowService.getCharacterProfileData(request,getCharacterDto)
    }
}
