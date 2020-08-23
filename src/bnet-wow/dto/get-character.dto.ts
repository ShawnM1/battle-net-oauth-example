import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetCharacterDto {
    @ApiProperty({
        type: String,
        description: 'The name of the realm the player character exists on',
        example: 'tichondrius'
    })
    @IsNotEmpty()
    @IsString()
    realmName: string

    @ApiProperty({
        type: String,
        description: 'The name of the player character',
        example: 'Reckful'
    })
    @IsNotEmpty()
    @IsString()
    characterName: string
}