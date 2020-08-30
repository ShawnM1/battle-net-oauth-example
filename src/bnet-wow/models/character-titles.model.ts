import { ApiProperty } from "@nestjs/swagger"

export class CharacterTitles {
    @ApiProperty()
    titles: Title[]

    @ApiProperty()
    activeTitle: Title
}

export interface Title {
    name: string
    id: number
}