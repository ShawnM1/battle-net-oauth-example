import { ApiProperty } from "@nestjs/swagger"

export class CharacterSummary {
    @ApiProperty({
        type: String,
    })
    id: string

    @ApiProperty({
        type: String,
        description: 'Name of the character',
    })
    name: string

    @ApiProperty({
        type: Number,
        description: 'Character level',
    })
    level: number

    @ApiProperty({
        type: Number,
        description: 'Character achievement points',
    })
    achievementPoints: number
}

