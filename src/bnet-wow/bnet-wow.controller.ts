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
import { Request } from 'express'
import { CharacterTitles } from './models/character-titles.model'

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
        @Req() request: Request,
        @Query(ValidationPipe) getCharacterDto: GetCharacterDto,
    ): Promise<CharacterSummary> {
        return await this.bnetWowService.getCharacterProfileData(request,getCharacterDto)
    }

    @Get('character-titles')
    @ApiResponse({
        description: 'player character titles',
        status: HttpStatus.OK,
        type: CharacterTitles,
    })
    @ApiOperation({ summary: 'Returns all player titles' })
    async getCharacterTitles(@Req() request: Request, @Query(ValidationPipe) getCharacterDto: GetCharacterDto): Promise<CharacterTitles> {
        return await this.bnetWowService.getCharacterTitles(request, getCharacterDto)
    }

    @Get('character-pvp')
    @ApiOperation({ summary: 'Returns character pvp summary' })
    async getCharacterPvpSummary(@Req() request: Request, @Query(ValidationPipe) getCharacterDto: GetCharacterDto): Promise<any> {
        return await this.bnetWowService.getCharacterPvpSummary(request, getCharacterDto)
    }
}
